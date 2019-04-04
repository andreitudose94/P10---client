import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'

import DropdownList from 'components/DropdownList'
import styles from './index.scss'
import { lang } from 'selectors/user'
import { setLocale } from 'actions/intl'

const mapStateToProps = (state) => ({
  language: lang()
})

class AppData extends Component {

  render() {
    const { language = 'en' } = this.props
    return (
      <div className='appData'>
        <div className='form-field'>
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
            extraClassName='form-dropdown'
          />
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps)(AppData);
