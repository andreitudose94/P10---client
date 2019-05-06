import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import Simplert from 'react-simplert'

import { changeUserDefaultPassword, logout } from 'actions/user.js'

import styles from './index.scss'

class ResetDefaultPassword extends Component {
  constructor(props){
    super(props);

    this.state = {
      redirect: false,
      oldPassword: props.match.params.oldPassword,
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: ''
    };

    logout()

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();

    const {
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message',
    } = this.state

    const { intl = {} } = this.props

    let password = document.getElementById('new-password').value;
    let confPassword = document.getElementById('confirm-new-password').value;

    if(password.length < 6) {
      // alert('The password\'s length should be greater than 5 characters!')
      return this.setState({
        alertShow: true,
        alertType: 'warning',
        alertTitle: intl.formatMessage({id: 'passwordLength'}),
        alertMssg: intl.formatMessage({id: 'passwordTooShort'}),
      })
    }
    if(password !== confPassword) {
      // alert('The confirmation password is wrong!')
      return this.setState({
        alertShow: true,
        alertType: 'warning',
        alertTitle: intl.formatMessage({id: 'empty'}),
        alertMssg: intl.formatMessage({id: 'confirmationPassWrong'}),
      })
    }

    changeUserDefaultPassword(password)
      .then((res) => {
        if (res.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: intl.formatMessage({id: 'error'}),
            alertMssg: res.error
          })
        }
        this.setState({redirect: true})
      })
  }

  render() {

    const {
      redirect = false,
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

        { redirect && <Redirect to='/login' /> }
      	<div className="d-flex justify-content-center h-100">
      		<div className="card">
      			<div className="card-header">
      				<h3>Introduce new password</h3>
      			</div>
      			<div className="card-body">
      				<form>
      					<div className="input-group form-group">
      						<div className="input-group-prepend">
      							<span className="input-group-text"><i className="fas fa-key"></i></span>
      						</div>
      						<input
                    type="password"
                    id='new-password'
                    className="form-control"
                    placeholder="New password"
                  />
      					</div>
                <div className="input-group form-group">
      						<div className="input-group-prepend">
      							<span className="input-group-text"><i className="fas fa-key"></i></span>
      						</div>
      						<input
                    type="password"
                    id='confirm-new-password'
                    className="form-control"
                    placeholder="Confirm new password"
                  />
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

export default injectIntl(ResetDefaultPassword);
