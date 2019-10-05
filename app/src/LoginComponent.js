import React, { Component } from 'react';
import Requests from './http/requests';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class LoginButton extends Component {
  setUserToLogin = () => {
    this.props.setUserToLogin(this.props.user);
  };

  render() {
    return (
      <Button
        key={this.props.user.teamId}
        variant="contained"
        color="primary"
        space="2"
        onClick={this.setUserToLogin}
      >
        {this.props.user.username}
      </Button>
    );
  }
}

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: undefined,
      userToLogin: undefined,
      password: '',
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Requests.getTeams().then(res => {
      this.setState({ users: res.data });
    });
  }

  setUserToLogin = user => {
    this.setState({ userToLogin: user });
  };

  setLoginError = err => {
    this.setState({ error: err.message });
  };

  login = () => {
    let data = {
      username: this.state.userToLogin.username,
      password: this.state.password.toLowerCase()
    };

    Requests.loginUser(data)
      .then(res => {
        this.props.setUser(res.data);
      })
      .catch(err => {
        this.setLoginError(err);
      });
  };

  createButtons = () => {
    let buttons = [];
    this.state.users.forEach(user => {
      buttons.push(
        <Grid item key={user.teamId}>
          <LoginButton
            user={user}
            setUserToLogin={this.setUserToLogin}
            setLoginError={this.setLoginError}
          />
        </Grid>
      );
    });
    return buttons;
  };

  handleChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.login();
  }

  renderError = () => {
    if (this.state.error) {
      return (
        <div>
          <p>Try not to mess this up, we got an error from the server:</p>
          <p>{this.state.error}</p>
        </div>
      );
    } else {
      return null;
    }
  };

  renderButtons = () => {
    if (this.state.users) {
      return this.createButtons();
    } else {
      return null;
    }
  };

  renderLoginForm = () => {
    if (this.state.userToLogin) {
      return (
        <form onSubmit={this.handleSubmit} style={{ marginTop: '10px' }}>
          <label>
            Password:
            <input
              type="test"
              autoFocus
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Login" />
        </form>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <div>
        <p>Which of these idiots you is?</p>
        <Grid container spacing={8}>
          {this.renderButtons()}
        </Grid>
        {this.renderError()}
        {this.renderLoginForm()}
      </div>
    );
  }
}

export default LoginComponent;
