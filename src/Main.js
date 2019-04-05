import React, {Component} from 'react';

import Navbar from 'containers/Navbar/index.js'
import LeftMenu from 'containers/LeftMenu/index.js'
import Content from 'containers/Content/index.js'

class Main extends Component {

  render() {
    const { children, location } = this.props

    return (
      <div className='main'>
        <Navbar {...location} />
        <LeftMenu pathname={location.pathname} />
        <Content pathname={location.pathname}>
          {children}
        </Content>
      </div>
    )
  }
}

export default Main;
