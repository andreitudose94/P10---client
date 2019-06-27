import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'

import DropdownList from 'components/DropdownList'
import styles from './index.scss'
import Users from './Users'
import Companies from './Companies'
import Responsibles from './Responsibles'
import Callers from './Callers'

class AppData extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedEntity: 'users'
    }
  }

  render() {
    const {
      selectedEntity = 'users'
    } = this.state
    return (
      <div className='appData'>
        <div className='form-field'>
          <FormattedMessage id='select-entity' />
          <DropdownList
            name={'languageDropdownList'}
    	      dataSource={
              [
               { id: 'users', name: "Users" },
               { id: 'companies', name: "Companies" },
               { id: 'responsibles', name: "Responsibles" },
               { id: 'callers', name: "Callers" },
        	    ]
            }
            value={selectedEntity}
            dataTextField={'name'}
            dataValueField={'id'}
            onChange={(val, name) => this.setState({selectedEntity: val})}
            extraClassName='form-dropdown'
          />
        </div>
        {
          selectedEntity === 'users' && <Users />
        }
        {
          selectedEntity === 'companies' && <Companies />
        }
        {
          selectedEntity === 'responsibles' && <Responsibles />
        }
        {
          selectedEntity === 'callers' && <Callers />
        }
      </div>
    )
  }
}

export default AppData;
