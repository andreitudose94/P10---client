import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import { logout } from 'actions/user.js'
import { changeCompanyDefaultPassword } from 'actions/companies.js'

import styles from './index.scss'

class ResetDefaultPasswordCompany extends Component {
  constructor(props){
    super(props);

    this.state = {
      redirect: false,
      oldPassword: props.match.params.oldPassword
    };

    logout()

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let password = document.getElementById('new-password').value;
    let confPassword = document.getElementById('confirm-new-password').value;

    if(password.length < 6) {
      alert('The password\'s length should be greater than 5 characters!')
      return
    }
    if(password !== confPassword) {
      alert('The confirmation password is wrong!')
      return
    }

    changeCompanyDefaultPassword(password)
      .then(() => this.setState({redirect: true}))
  }

  render() {
    const { redirect = false } = this.state
    return (
      <div className="container login">
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
                  Your company's password has been reset successfully!
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ResetDefaultPasswordCompany
