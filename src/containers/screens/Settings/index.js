import React, {Component} from 'react'
// import { connect } from 'react-redux'
import { FormattedMessage, connect } from '../../../lib'

import DropdownList from '../../../components/DropdownList'
import styles from './index.scss'
import { lang } from '../../../selectors/user'
import { setLocale } from '../../../actions/intl'

const mapStateToProps = (state) => ({
  language: lang()
})

class Settings extends Component {

  render() {
    const { language = 'en' } = this.props
    return (
      <div className='settings'>
        <FormattedMessage id='language' />

        <DropdownList
          name={'languageDropdownList'}
  	      dataSource={
            [
             { id: 'en', name: "English" },
             { id: 'ro', name: "Romanian" }
      	   ]
          }
          value={language}
          dataTextField={'name'}
          dataValueField={'id'}
          onChange={(val, name) => setLocale(val)}
        />

      </div>
    )
  }
}

export default connect(mapStateToProps)(Settings);