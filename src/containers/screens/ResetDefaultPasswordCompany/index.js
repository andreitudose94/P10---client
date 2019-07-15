import React, { Component } from 'react';
import { FormattedMessage } from 'lib'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Simplert from 'react-simplert'
import { injectIntl } from 'react-intl'

import { logout } from 'actions/user.js'
import { changeCompanyDefaultPassword } from 'actions/companies.js'

import styles from './index.scss'

class ResetDefaultPasswordCompany extends Component {
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
      alertMssg = 'No message'
    } = this.state

    const { intl = {} } = this.props

    let password = document.getElementById('new-password').value;
    let confPassword = document.getElementById('confirm-new-password').value;

    if(password.length < 6) {
      return this.setState({
        alertShow: true,
        alertType: 'warning',
        alertTitle: intl.formatMessage({id: 'passwordLength'}),
        alertMssg:  intl.formatMessage({id: 'passwordTooShort'}),
      })
    }
    if(password !== confPassword) {
      return this.setState({
        alertShow: true,
        alertType: 'warning',
        alertTitle: intl.formatMessage({id: 'passwordLength'}),
        alertMssg: intl.formatMessage({id: 'confirmationPassWrong'}),
      })
    }

    changeCompanyDefaultPassword(password)
      .then((r) => {
        if (r.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: intl.formatMessage({id: 'error'}),
            alertMssg: r.error
          })
        }
        if(r && r.body.ok) {
          this.setState({redirect: true})
        }
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

        {
          !redirect &&
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
        }
        {
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-body">
                <div className="success-message">
                  <FormattedMessage id='passResetSuccess' />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default injectIntl(ResetDefaultPasswordCompany)
