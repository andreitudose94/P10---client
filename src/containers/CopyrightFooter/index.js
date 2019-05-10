import React, {Component} from 'react';
import { FormattedMessage } from 'lib'

import styles from './index.scss'

class CopyrightFooter extends React.Component {

  render() {
    return (
      <div className={'copyrightFooter'}>
        <div className={'text'}>
          <FormattedMessage id='copyrightMssg' />
        </div>
      </div>
    )
  }
}

export default CopyrightFooter
