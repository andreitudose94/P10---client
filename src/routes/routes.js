import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'

import { getUserLoggedIn } from '../selectors/user'

import Main from '../Main.js';
import App from '../App.js';
import Login from '../containers/Login/index.js';
// import SignupPage from '../SignupPage/SignupPage';
// import ResetPassword from '../SignupPage/ResetPassword';

const PrivateRoute = ({ component, userLoggedIn, ...rest }) => (
  <Route {...rest} render={(props) => userLoggedIn ?
    React.createElement(component, props)
    : <Redirect to='/login' />
  } />
)

const mapStateToProps = (state) =>({
  userLoggedIn: getUserLoggedIn(state)
})

class RenderRoutes extends Component {

  render() {
    const { userLoggedIn } = this.props
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' render={() => userLoggedIn ?
            <Redirect to='/' />
            : <Login />
          } />
          <Route render={() => userLoggedIn ?
            <Main>
              <Switch>
                <PrivateRoute path='/' userLoggedIn={userLoggedIn} exact component={App} />
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
