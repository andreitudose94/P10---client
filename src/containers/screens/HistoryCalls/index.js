import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import moment from 'moment'
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DropdownList from 'components/DropdownList'
import Grid from 'components/Grid'
import Chart from 'components/Chart'

import { getCalls } from 'actions/calls'
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
      dateFilter: '',
      perc_opened: 20,
      perc_completed: 30,
      perc_rejected: 15,
      perc_completed: 55,
      redirectTo: ''
    }
  }

  componentDidMount() {

    $("#toolbar-addCallBtn").click((e) => {
	    this.setState({ redirectTo: '/new_call' })
		});

    getCalls()
      .then((calls) => this.setState({ calls }))
      .then(() => this.getResponsiblesAndPrelucrateThem())
  }

  getResponsiblesAndPrelucrateThem() {
    return getResponsibles()
      .then((responsibles) => {
        let dsResponsiblesAux = [{ id: '', name: 'Any' }]
        responsibles.forEach((rs) => dsResponsiblesAux.push({ id: rs._id, name: rs.name + ' | ' + rs.responsibleId }))
        return this.setState({ dsResponsibles: dsResponsiblesAux })
      })
  }

  render() {
    const {
      calls = [],
      redirectTo = '',
      dsResponsibles = [],
      responsible = '',
      dateFilter = ''
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
                value={dateFilter}
                dataTextField={'name'}
                dataValueField={'id'}
                onChange={(val, name) => this.setState({ dateFilter: val })}
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
                      <div className='percentage'>30.00%</div>
                      <div className='category'>OPEN</div>
                    </div>
                    <div>
                      <div className='percentage'>50.00%</div>
                      <div className='category'>COMPLETED</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='statisticalCell'>
                    <div>
                      <div className='percentage'>20.00%</div>
                      <div className='category'>REJECTED</div>
                    </div>
                    <div>
                      <div className='percentage'>0.00%</div>
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
        						value: 4,
        						color: "#d2eafd"
        					},{
        						category: "Accepted",
        						value: 6,
        						color: "#a6d4fa"
        					},{
        						category: "In Progress",
        						value: 20,
        						color: "#4daaf6"
        					},{
        						category: "Rejected",
        						value: 10,
        						color: "#074b83"
        					},{
        						category: "Interrupted",
        						value: 50,
        						color: "#085a9d"
        					},{
        						category: "Completed",
        						value: 10,
        						color: "#0c87eb"
          				}]
               }]}
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
            this.initializeKendoProgressBars(e.sender._data)
          }}
        />
      </div>
    )
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
