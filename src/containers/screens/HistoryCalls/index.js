import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import moment from 'moment'
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DropdownList from 'components/DropdownList'
import Grid from 'components/Grid'
import Chart from 'components/Chart'
import Loader from 'components/Loader'

import { getCalls, getFilteredCalls } from 'actions/calls'
import { getResponsibles } from 'actions/responsibles'

import styles from './index.scss'
import {
  rowTemplate,
  altRowTemplate,
  toolbarTemplate,
  responsible_dd_template,
  responsible_dd_headerTemplate,
} from './kendo-templates'

const dsDateFilter = [
  {
    id: '',
    name: 'All'
  },
  {
    id: '0',
    name: 'Today'
  },
  {
    id: '5',
    name: 'Last 5 Days'
  },
  {
    id: '30',
    name: 'Last 30 Days'
  },
  {
    id: '90',
    name: 'Last 90 Days'
  }
]

class HistoryCalls extends Component {

  constructor(props) {
    super(props)

    this.state = {
      calls: [],
      dsResponsibles: [{ id: '', name: 'Any' }],
      responsible: '',
      afterNumberOfDays: '',
      perc_opened: 0,
      perc_completed: 0,
      perc_rejected: 0,
      perc_droped: 0,
      redirectTo: '',
      perc_assigned: 0,
      perc_inPrg: 0,
      perc_interr: 0,
      perc_acc: 0,
      showLoader: false,
    }

    this.initializeViewMissionButtons = this.initializeViewMissionButtons.bind(this)
    this.statusStatistics = this.statusStatistics.bind(this)
  }

  componentDidMount() {

    $("#toolbar-addCallBtn").click((e) => {
	    this.setState({ redirectTo: '/new_call' })
		});

    this.setState({ showLoader: true })

    getCalls()
      .then((calls) => {
        const newCalls = []
        calls.forEach((call) => {
          let promisedDateTime = 'Not set'
          if (call.promisedDateTime) {
            promisedDateTime = moment(new Date(call.promisedDateTime)).format('lll')
          }
          newCalls.push({
            ...call,
            datetime: moment(new Date(call.datetime)).format('lll'),
            promisedDateTime: promisedDateTime
          })
        })
        // here you should go to each call and display its datetime in a specific format
        // and also calculate the statistical for the chart
        this.statusStatistics(calls)
        return this.setState({ calls: newCalls })
      })
      .then(() => this.getResponsiblesAndPrelucrateThem())
      .then(() => this.setState({ showLoader: false }))
  }

  getResponsiblesAndPrelucrateThem() {
    return getResponsibles()
      .then((responsibles) => {
        let dsResponsiblesAux = [{ id: '', name: 'Any' }]
        responsibles.forEach((rs) => dsResponsiblesAux.push({ id: rs._id, name: rs.name + ' | ' + rs.responsibleId }))
        return this.setState({ dsResponsibles: dsResponsiblesAux })
      })
  }

  componentDidUpdate(prevProps, prevState) {

    const prevResponsible = prevState.responsible
    const prevAfterNumberOfDays = prevState.afterNumberOfDays

    const { responsible, afterNumberOfDays, dsResponsibles = [] } = this.state
    if(prevResponsible !== responsible || prevAfterNumberOfDays !== afterNumberOfDays) {

      let afterDate = ''
      if(afterNumberOfDays !== '') {
        afterDate = new Date(moment().subtract(parseInt(afterNumberOfDays), 'days').startOf('day'))
      }

      let selectedResponsible = dsResponsibles.find((r) => r.id === responsible).name
      if(selectedResponsible === 'Any') {
        selectedResponsible = ''
      }

      getFilteredCalls({
        afterDate,
        responsible: selectedResponsible
      })
        .then((calls) => {
          const newCalls = []
          calls.forEach((call) => {
            let promisedDateTime = 'Not set'
            if (call.promisedDateTime) {
              promisedDateTime = moment(new Date(call.promisedDateTime)).format('lll')
            }
            newCalls.push({
              ...call,
              datetime: moment(new Date(call.datetime)).format('lll'),
              promisedDateTime: promisedDateTime
            })
          })
          this.setState({ calls: newCalls })
          return newCalls
        })
        .then((calls) => this.statusStatistics(calls))
    }
  }

  statusStatistics(calls) {
      var assigned = 0, inPrg = 0, rej = 0, interr = 0, acc = 0, completed = 0;
      for(var i = 0 ; i < calls.length ; i ++) {
        if(calls[i].status == "Assigned") assigned ++;
        else if(calls[i].status == "In Progress") inPrg ++;
        else if(calls[i].status == "Rejected") rej ++;
        else if(calls[i].status == "Interrupted") interr ++;
        else if(calls[i].status == "Accepted") acc ++;
        else if(calls[i].status == "Completed") completed ++;
      }
      var perc_assigned = (assigned/calls.length) * 100;
      var perc_inPrg = (inPrg/calls.length) * 100;
      var perc_rej = (rej/calls.length) * 100;
      var perc_interr = (interr/calls.length) * 100;
      var perc_acc = (acc/calls.length) * 100;
      var perc_completed = (completed/calls.length) * 100;
      this.setState({
        perc_opened: perc_assigned + perc_inPrg + perc_acc,
        perc_completed: perc_completed,
        perc_rejected: perc_rej,
        perc_droped: perc_interr,
        perc_assigned: perc_assigned,
        perc_inPrg: perc_inPrg,
        perc_interr: perc_interr,
        perc_acc: perc_acc,
      })
    }

  render() {
    const {
      calls = [],
      redirectTo = '',
      dsResponsibles = [],
      responsible = '',
      afterNumberOfDays = '',
      perc_opened = 0,
      perc_completed = 0,
      perc_rejected = 0,
      perc_droped = 0,
      perc_assigned = 0,
      perc_acc = 0,
      perc_inPrg = 0,
      perc_interr = 0,
      showLoader = false,
    } = this.state

    return (
      <div className='historyCalls'>
        { redirectTo.length !== 0 && <Redirect to={redirectTo} /> }
        <div className='historyCalls-headerSection'>
          <div className='sectionLeft'>
            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='responsible' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="suitcase" />
              </div>
              <DropdownList
                name={'responsiblesDropdownList'}
                dataSource={dsResponsibles}
                value={responsible}
                dataTextField={'name'}
                dataValueField={'id'}
                useSelect={true}
                onChange={(val, name) => this.setState({ responsible: val })}
                template={responsible_dd_template}
                headerTemplate={responsible_dd_headerTemplate}
                searchPlaceholder='Responsible | ID'
                filter={'contains'}
                useSelect={true}
                extraClassName='form-dropdown'
              />
            </div>
            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='date' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="suitcase" />
              </div>
              <DropdownList
                name={'dateFilterDropdownList'}
                dataSource={dsDateFilter}
                value={afterNumberOfDays}
                dataTextField={'name'}
                dataValueField={'id'}
                useSelect={true}
                onChange={(val, name) => this.setState({ afterNumberOfDays: val })}
                extraClassName='form-dropdown'
              />
            </div>
          </div>
          <div className='sectionCenter'>
            <table className='statisticalView'>
              <tbody>
                <tr>
                  <td className='statisticalCell'>
                    <div>
                      <div className='percentage'>{perc_opened.toFixed(2)}%</div>
                      <div className='category'>OPEN</div>
                    </div>
                    <div>
                      <div className='percentage'>{perc_completed.toFixed(2)}%</div>
                      <div className='category'>COMPLETED</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='statisticalCell'>
                    <div>
                      <div className='percentage'>{perc_rejected.toFixed(2)}%</div>
                      <div className='category'>REJECTED</div>
                    </div>
                    <div>
                      <div className='percentage'>{perc_droped.toFixed(2)}%</div>
                      <div className='category'>DROPPED</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='sectionRight'>
            <Chart
              chartId='catogoriesChart'
              chartType='pie'
              height={210}
              width={320}
              legendPosition={'right'}
              series={
                [{
                  startAngle: 0,
                  data: [{
        						category: "Assigned",
        						value: perc_assigned.toFixed(2),
        						color: "#d2eafd"
        					},{
        						category: "Accepted",
        						value: perc_acc.toFixed(2),
        						color: "#a6d4fa"
        					},{
        						category: "In Progress",
        						value: perc_inPrg.toFixed(2),
        						color: "#4daaf6"
        					},{
        						category: "Rejected",
        						value: perc_rejected.toFixed(2),
        						color: "#074b83"
        					},{
        						category: "Interrupted",
        						value: perc_interr.toFixed(2),
        						color: "#085a9d"
        					},{
        						category: "Completed",
        						value: perc_completed.toFixed(2),
        						color: "#0c87eb"
          				}]
               }]
             }
             tooltip= {{
                visible: true,
                template: '#:category# <br> #:value#%'
             }}
            />
          </div>
        </div>
        <Grid
          gridId={'historyCallsGrid'}
          dataSource={calls}
          columns={
            [{
              field: "index",
              title: 'Call Index'
            },{
              field: "extId",
              title: 'External Id'
            },{
              field: "datetime",
              title: 'Call Datetime'
            },{
              field: "caller",
              title: 'Caller'
            },{
              field: "callerCompany",
              title: 'Caller Company'
            },{
              field: "summary",
              title: 'Summary'
            },{
              field: "type",
              title: 'Type'
            },{
              field: "queue",
              title: 'Queue'
            },{
              field: "phoneNo",
              title: 'Phone'
            },{
              field: "eventAddress",
              title: 'Event Address'
            },{
              field: "promisedDateTime",
              title: 'Promised Datetime'
            },{
              field: "responsible",
              title: 'Responsible'
            },{
              field: "contact",
              title: 'Contact'
            },{
              field: "contactAddress",
              title: 'Contact Address'
            },{
              field: "contactPhoneNo",
              title: 'Contact Phone'
            },{
              field: "status",
              title: 'Status'
            }]
          }
          rowTemplate={rowTemplate}
          altRowTemplate={altRowTemplate}
          visibleHeader={false}
          pageable={{
            pageSize: 10
          }}
          toolbar={toolbarTemplate}
          excel={{
            fileName: "Calls.xlsx",
            allPages: true
          }}
          excelButtonTitle={'Excel'}
          excelButtonIcon={'fa-download'}
          onDataBound={(e) => {
            this.initializeViewMissionButtons(e.sender._data)
            this.initializeKendoProgressBars(e.sender._data)
          }}
        />

        <Loader show={showLoader} />
      </div>
    )
  }

  initializeViewMissionButtons(data) {

    for(let i = 0 ; i < data.length ; i ++) {
        const id = data[i].index;
        $('#btn_' + id).kendoButton({
    			click: (e) => {
    				this.setState({
              redirectTo: '/view_mission/' + id
            });
    			}
        });
    }

  }

  initializeKendoProgressBars(data) {

    const percentage_status = {};
    percentage_status["Assigned"] = 20;
    percentage_status["Accepted"] = 40;
    percentage_status["In Progress"] = 60;
    percentage_status["Rejected"] = 100;
    percentage_status["Interrupted"] = 80;
    percentage_status["Completed"] = 100;

    for(let i = 0 ; i < data.length ; i ++) {
        const id = data[i].index;
        const status = data[i].status;
        $("#prgBar_" + id).kendoProgressBar({
          change: function(e) {
            this.progressStatus.text(status);
            let bckcolor = "#d2eafd", txtcolor = "black";
            if(status == "Accepted") {bckcolor = "#a6d4fa"; txtcolor = "black";}
            else if(status == "In Progress") {bckcolor = "#4daaf6"; txtcolor = "black";}
            else if(status == "Rejected") {bckcolor = "#074b83"; txtcolor = "white";}
            else if(status == "Interrupted") {bckcolor = "#085a9d"; txtcolor = "white";}
            else if(status == "Completed") {bckcolor = "#0c87eb"; txtcolor = "white";}

            this.progressWrapper.css({
              "background-color": bckcolor,
              "border-color": bckcolor,
              "color": txtcolor
            });
          }
        });

        $("#prgBar_" + id).data("kendoProgressBar").value(percentage_status[status]);
    }
  }
}

export default HistoryCalls;
