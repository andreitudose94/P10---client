import React, {Component} from 'react';

import Navbar from 'containers/Navbar/index.js'
import LeftMenu from 'containers/LeftMenu/index.js'
import Content from 'containers/Content/index.js'

class Main extends Component {

  componentDidMount() {
    // request("http://localhost:8000/api/users", 'GET')
  }

  render() {
    const { children, location } = this.props

    return (
      <div className='main'>
        <Navbar {...location} />
        <LeftMenu />
        <Content>
          {children}
        </Content>
      </div>
    )
  }
}

export default Main;
