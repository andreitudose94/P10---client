import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'

import { getUserLoggedIn } from '../selectors/user'
import { createHashHistory } from 'history'

import Main from 'Main.js';
import App from 'App.js';
import Login from 'containers/screens/Login';
import Settings from 'containers/screens/Settings'
import Tenants from 'containers/screens/Tenants'
import AppData from 'containers/screens/AppData'
import CallRegistration from 'containers/screens/CallRegistration'
import ResetDefaultPassword from 'containers/screens/ResetDefaultPassword'
import FieldMap from 'containers/screens/FieldMap'

// import SignupPage from '../SignupPage/SignupPage';
// import ResetPassword from '../SignupPage/ResetPassword';

const PrivateRoute = ({ component, userLoggedIn, ...rest }) => {
  return <Route {...rest} render={(props) => userLoggedIn ?
    React.createElement(component, props)
    : <Redirect to='/login' />
  } />
}

const mapStateToProps = (state) =>({
  userLoggedIn: getUserLoggedIn(state)
})

class RenderRoutes extends Component {

  render() {
    const { userLoggedIn } = this.props
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' render={() => {
              if(userLoggedIn) {
                return <Redirect to='/' />
              }
              else {
                return <Login />
              }
            }
          } />
          <Route path='/reset-default-password/:oldPassword' component={ResetDefaultPassword} />
          <Route render={(props) => userLoggedIn ?
            <Main {...props}>
              <Switch>
                <PrivateRoute path='/' exact userLoggedIn={userLoggedIn} exact component={Tenants} />
                <PrivateRoute path='/data' userLoggedIn={userLoggedIn} exact component={AppData} />
                <PrivateRoute path='/settings' userLoggedIn={userLoggedIn} exact component={Settings} />
                <PrivateRoute path='/new_call' userLoggedIn={userLoggedIn} exact component={CallRegistration} />
                <PrivateRoute path='/responsiblesPositions' userLoggedIn={userLoggedIn} exact component={FieldMap} />
              </Switch>
            </Main>
            :
            <Redirect to='/login' />
          } />
        </Switch>
      </BrowserRouter>
    )
  }
}


export default connect(mapStateToProps)(RenderRoutes)
