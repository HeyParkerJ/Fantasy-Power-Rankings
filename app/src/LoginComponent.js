import React, { Component } from 'react';
import Requests from './http/requests';

class LoginButton extends Component {

  setUserToLogin = () => {
    this.props.setUserToLogin(this.props.username)
  }

  render() {
    return (
      <button onClick={this.setUserToLogin}>{this.props.username}</button>
    )
  }
}

class LoginComponent extends Component {
  constructor() {
    super()
    this.state = {
      users: undefined,
      userToLogin: undefined,
      password: '',
      error: null,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Requests.getUsers().then((res) => {
      this.setState({users: res.data})
    })
  }

  setUserToLogin = (event) => {
    this.setState({userToLogin: event})
  }

  setLoginError = (err) => {
    this.setState({error: err.message})
  }

  login = () => {
    let data = {
      username: this.state.userToLogin,
      password: this.state.password,
    }

    Requests.loginUser(data).then((res) => {
      this.props.setUsername(res.data[0].username)
    }).catch((err) => {
      this.setLoginError(err);
    })
  }

  RenderButtons = () => {
    let buttons = []
    this.state.users.forEach((user) => {
      buttons.push(<LoginButton username={user.username}
                   setUsername={this.props.setUsername}
                   setUserToLogin={this.setUserToLogin}
                   setLoginError={this.setLoginError}/>)
    })
    return buttons;
  }

  handleChange(event) {
    this.setState({password: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    this.login()
  }

  render() {
    // TODO - Make these html declarations functions
    let buttons = []
    let error = null
    let loginForm = null

    if(this.state.users) {
      buttons = this.RenderButtons(); 
    }

    if(this.state.error) {
      error = (
        <div>
          <p>Try not to mess this up, we got an error from the server:</p>
          <p>{this.state.error}</p>
        </div>
      )
    }

    if(this.state.userToLogin) {
      loginForm = (
        <form onSubmit={this.handleSubmit}>
          <label>Password:
            <input type="test" value={this.state.password} onChange={this.handleChange}/>
          </label>
            <input type="submit" value="Login"/>
        </form>
      )
    }

    return (
      <div>
        {error}
        <p>Which of these idiots you is?</p>
        {buttons}
        {loginForm}
      </div>
    )
  }
}

export default LoginComponent;
