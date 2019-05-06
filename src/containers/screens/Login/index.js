import React, { Component } from 'react';
import { connect } from 'react-redux'
import Simplert from 'react-simplert'
import { injectIntl } from 'react-intl'

import { login } from 'actions/user.js'

import styles from './index.scss'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    const { intl = {} } = this.props
    e.preventDefault();
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    // login(email, password)
    login(email, password)
      .then((res) => {
        if (res.error) {
          this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: intl.formatMessage({id: 'discrepancy'}),
            alertMssg: intl.formatMessage({id: 'wrongCredentials'}),
          })
        }
      // console.log(res))
    })
  }

  render() {

    const {
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
    } = this.state

    return (
      <div className="container login">

        <Simplert
          showSimplert={alertShow}
          type={alertType}
          title={alertTitle}
          message={alertMssg}
          onClose={() => this.setState({alertShow: false})}
        />

      	<div className="d-flex justify-content-center h-100">
      		<div className="card">
      			<div className="card-header">
      				<h3>Sign In</h3>
      			</div>
      			<div className="card-body">
      				<form>
      					<div className="input-group form-group">
      						<div className="input-group-prepend">
      							<span className="input-group-text"><i className="fas fa-user"></i></span>
      						</div>
      						<input type="text" id='login-email' className="form-control" placeholder="username" />
      					</div>
      					<div className="input-group form-group">
      						<div className="input-group-prepend">
      							<span className="input-group-text"><i className="fas fa-key"></i></span>
      						</div>
      						<input type="password" id='login-password' className="form-control" placeholder="password" />
      					</div>
      					<div className="form-group">
      						<input type="submit" value="Login" className="btn float-right login_btn" onClick={this.handleSubmit} />
      					</div>
      				</form>
      			</div>
      		</div>
      	</div>
      </div>
    );
  }
}

export default injectIntl(Login);
