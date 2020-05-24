import React, { Component } from 'react';
import { withRouter } from "react-router";
import './App.css';

class App extends Component {
  state = {
    data: null,
    username: '',
    password: ''
  };
  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI().then(res => this.setState({ data: res.express })).catch(err => console.log(err));
  };
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };
  handleSubmit = async e  => {
    e.preventDefault();
    const response = await fetch('/verifyUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.state.username, password: this.state.password }),
    });
    const body = await response.json();
    if (body.message === 'Valid') {
      this.props.history.push("/dashboard");
    } else {
      this.props.history.push("/errorPage")
    }
  }
  render() {
  return (
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3>Sign In</h3>
          </div>
          <div class="card-body">
            <form onSubmit={this.handleSubmit}>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="username" onChange={e => this.setState({ username: e.target.value })} value={this.state.username}/>
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>
                <input type="password" class="form-control" placeholder="password" onChange={e => this.setState({ password: e.target.value })} value={this.state.password}/>
              </div>
              <div class="row align-items-center remember">
              </div>
              <div class="form-group">
                <input type="submit" value="Login" class="btn float-right login_btn"/>
              </div>
            </form>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links">
              Sign Up will be available soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };
}

export default withRouter(App);
