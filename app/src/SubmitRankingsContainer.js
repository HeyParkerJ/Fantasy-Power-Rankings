import React, { Component } from 'react';
import RankingSelectionContainer from './RankingSelectionContainer'
import Requests from './http/requests';

class LoginButton extends Component {

  login = () => {
    let data = {
      username: this.props.username,
      password: 'prkr',
    }

    Requests.loginUser(data).then((res) => {
      this.props.setUsername(res.data[0].username)
    }).catch((err) => {
      this.props.setLoginError(err);
    })
  }

  render() {
    return (
      <button onClick={this.login}>{this.props.username}</button>
    )
  }
}

class LoginComponent extends Component {
  constructor() {
    super()
    this.state = {
      users: undefined,
      error: null,
    }
  }

  componentDidMount() {
    Requests.getUsers().then((res) => {
      console.log('returned getting users with res.data:', res.data)
      this.setState({users: res.data})
    })
  }

  setLoginError = (err) => {
    this.setState({error: err.message})
  }

  RenderButtons = () => {
    let buttons = []
    this.state.users.forEach((user) => {
      buttons.push(<LoginButton username={user.username} setUsername={this.props.setUsername} setLoginError={this.setLoginError}/>)
    })
    return buttons;
  }

  render() {
    let buttons = []
    let error = []
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

    return (
      <div>
        {error}
        <p>Which of these idiots you is?</p>
        {buttons}
      </div>
    )
  }
}



class SubmitRankingsContainer extends Component {

  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      username: undefined,
    }
  }

  setUsername = (username) => {
    this.setState({isLoggedIn: true, username: username})
  }

  render() {

    return (
        <div>
          <p>Submit rankings for the week. Closes on Thursday at 5pm Parker time.</p>
          {this.state.isLoggedIn ?
            <RankingSelectionContainer username={this.state.username}/> :
            <LoginComponent setUsername={this.setUsername}/>}
        </div>
    )
  }

}
export default SubmitRankingsContainer;
