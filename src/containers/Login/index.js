import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import request from 'superagent'

import {
  setCurrentUserCredentials
} from '../../actions/user.js'
import styles from './index.scss'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: '',
      redirect: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    request
      .post('http://localhost:8000/api/users/login')
      .send(
        {
          user: {
            email,
            password
          }
        }
      )
      .set('accept', 'json')
      .then(res => setCurrentUserCredentials(res.body.user))
      .catch(err => alert(err.response.body.message))
  }

  render() {
    const error = this.state.error;

    return (
      <div className="container login">
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

export default Login