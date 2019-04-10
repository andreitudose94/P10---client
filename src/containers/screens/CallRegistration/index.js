import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DropdownList from 'components/DropdownList'
import Textbox from 'components/Textbox'
import DatePicker from 'components/DatePicker'
import Button from 'components/Button'

import styles from './index.scss'

const mapStateToProps = (state) => ({
  // language: lang()
})

class CallRegistration extends Component {

  render() {
    return (
      <div className='callRegistration'>
        <div className='form-field'>
          <FormattedMessage id='externalId' />
          <Textbox
            name={'create-user-name'}
            value={name}
            extraClassName='textField'
            placeholder={'Type to add external id'}
            onChange={(value, name) => this.setState({name: value})}
          />
        </div>

        <div className='callRegistrationRow'>
          <div className='form-field dateAndTime'>
            <div className='labelContainer'>
              <FormattedMessage id='date' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="calendar-check" />
            </div>
            <Textbox
              name={'create-user-name'}
              value={name}
              extraClassName='textField readonlyField'
              readOnly={true}
              onChange={(value, name) => this.setState({name: value})}
            />
          </div>
          <div className='form-field dateAndTime'>
            <div className='labelContainer'>
              <FormattedMessage id='time' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="clock" />
            </div>
            <Textbox
              name={'create-user-name'}
              value={name}
              extraClassName='textField readonlyField'
              onChange={(value, name) => this.setState({name: value})}
              readOnly={true}
            />
          </div>
        </div>

          <div className='form-field'>
            <div className='labelContainer'>
              <FormattedMessage id='caller' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="user-check" />
            </div>
            <DropdownList
              name={'languageDropdownList'}
              dataSource={
                [
                 { id: 'en', name: 'English' },
                 { id: 'ro', name: 'Romanian' }
               ]
              }
              value={'en'}
              dataTextField={'name'}
              dataValueField={'id'}
              onChange={(val, name) => setLocale(val)}
              extraClassName='form-dropdown'
            />
          </div>

          <div className='callRegistrationRow'>
            <div className='form-field address'>
              <div className='labelContainer'>
                <FormattedMessage id='eventAddress' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="map-marked-alt" />
              </div>
              <Textbox
                name={'create-user-name'}
                value={name}
                extraClassName='textField'
                onChange={(value, name) => this.setState({name: value})}
              />
            </div>
            <div className='containerLatAndLong'>
              <div className='form-field latAndLong'>
                <div className='labelContainer'>
                  <FormattedMessage id='latitude' />
                  <FontAwesomeIcon className='callRegistrationIcon' icon="location-arrow" />
                </div>
                <Textbox
                  name={'create-user-name'}
                  value={name}
                  extraClassName='textField readonlyField'
                  readOnly={true}
                  onChange={(value, name) => this.setState({name: value})}
                />
              </div>
              <div className='form-field latAndLong'>
                <div className='labelContainer'>
                  <FormattedMessage id='longitude' />
                  <FontAwesomeIcon className='callRegistrationIcon' icon="location-arrow" />
                </div>
                <Textbox
                  name={'create-user-name'}
                  value={name}
                  extraClassName='textField readonlyField'
                  readOnly={true}
                  onChange={(value, name) => this.setState({name: value})}
                />
              </div>
            </div>
          </div>

          <div className='form-field'>
            <div className='labelContainer'>
              <FormattedMessage id='callSumary' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="comment-alt" />
            </div>
            <textarea type="text" ref="description" placeholder="Type to add call summary"></textarea>
          </div>


          <div className='form-field'>
            <FormattedMessage id='type' />
            <DropdownList
              name={'typesDropdownList'}
              dataSource={
                [
                 { id: 'en', name: 'English' },
                 { id: 'ro', name: 'Romanian' }
               ]
              }
              value={'en'}
              dataTextField={'name'}
              dataValueField={'id'}
              onChange={(val, name) => setLocale(val)}
              extraClassName='form-dropdown'
            />
          </div>

          <div className='form-field'>
            <FormattedMessage id='queue' />
            <Textbox
              name={'create-user-name'}
              value={name}
              extraClassName='textField'
              placeholder={'Type to add the call to a queue'}
              onChange={(value, name) => this.setState({name: value})}
            />
          </div>

          <div className='form-field'>
            <div className='labelContainer'>
              <FormattedMessage id='phoneNo' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="phone" />
            </div>
            <Textbox
              name={'create-user-name'}
              value={name}
              extraClassName='textField'
              placeholder={'Type to add phone number'}
              onChange={(value, name) => this.setState({name: value})}
            />
          </div>

          <div className='form-field'>
            <div className='labelContainer'>
              <FormattedMessage id='contactPerson' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="users" />
            </div>
            <Textbox
              name={'create-user-name'}
              value={name}
              extraClassName='textField'
              placeholder={'Type to add contact person'}
              onChange={(value, name) => this.setState({name: value})}
            />
          </div>

          <div className='form-field'>
            <div className='labelContainer'>
              <FormattedMessage id='contactPhone' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="phone" />
            </div>
            <Textbox
              name={'create-user-name'}
              value={name}
              extraClassName='textField'
              placeholder={'Type to add contact phone'}
              onChange={(value, name) => this.setState({name: value})}
            />
          </div>

          <div className='callRegistrationRow'>
            <div className='form-field address'>
              <div className='labelContainer'>
                <FormattedMessage id='contactAddress' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="map-marked-alt" />
              </div>
              <Textbox
                name={'create-user-name'}
                value={name}
                extraClassName='textField'
                onChange={(value, name) => this.setState({name: value})}
              />
            </div>
            <div className='containerLatAndLong'>
              <div className='form-field latAndLong'>
                <div className='labelContainer'>
                  <FormattedMessage id='latitude' />
                  <FontAwesomeIcon className='callRegistrationIcon' icon="location-arrow" />
                </div>
                <Textbox
                  name={'create-user-name'}
                  value={name}
                  extraClassName='textField readonlyField'
                  readOnly={true}
                  onChange={(value, name) => this.setState({name: value})}
                />
              </div>
              <div className='form-field latAndLong'>
                <div className='labelContainer'>
                  <FormattedMessage id='longitude' />
                  <FontAwesomeIcon className='callRegistrationIcon' icon="location-arrow" />
                </div>
                <Textbox
                  name={'create-user-name'}
                  value={name}
                  extraClassName='textField readonlyField'
                  readOnly={true}
                  onChange={(value, name) => this.setState({name: value})}
                />
              </div>
            </div>
          </div>

          <div className='callRegistrationRow'>
            <div className='form-field dateAndTime'>
              <div className='labelContainer'>
                <FormattedMessage id='promiseDate' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="calendar-check" />
              </div>
              <DatePicker
                name={'myDateTimePicker'}
                value={new Date(2019, 2, 10)}
                disableDates={[ new Date(2019, 2, 11), new Date(2019, 2, 12) ]}
                format={'MM/dd/yyyy'}
                max={new Date(2019, 3, 8)}
                min={new Date(2019, 1, 1)}
                weekNumber={true}
                start={'month'}
                classDatePicker={'datePicker'}
                onChange={(val, name) => {
            	    // if you want to send this value to Rollbase server
            	    // then use moment js library
            	    // const formattedDate = moment(val).format('MM/DD/YYYY')
            	    console.log(val, name)
            	  }}
              />

            </div>

            <div className='form-field dateAndTime'>
              <div className='labelContainer'>
                <FormattedMessage id='promiseTime' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="clock" />
              </div>
              <Textbox
                name={'create-user-name'}
                value={name}
                extraClassName='textField'
                onChange={(value, name) => this.setState({name: value})}
              />
            </div>
          </div>


          <div className='labelContainer'>
            <FormattedMessage id='responsible' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="users" />
          </div>
          <DropdownList
            name={'responsiblesDropdownList'}
            dataSource={
              [
               { id: 'en', name: 'English' },
               { id: 'ro', name: 'Romanian' }
             ]
            }
            value={'en'}
            dataTextField={'name'}
            dataValueField={'id'}
            onChange={(val, name) => setLocale(val)}
            extraClassName='form-dropdown'
          />

          <Button
            name={'Save'}
            enable={true}
            icon={'save'}
            primary={true}
            extraClassName={'form-button'}
            onClick={(name) => console.log(name)}
          >
            <FormattedMessage id='save' />
          </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(CallRegistration);
