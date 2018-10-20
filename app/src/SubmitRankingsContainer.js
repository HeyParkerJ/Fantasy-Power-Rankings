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
    }
  }

  componentDidMount() {
    Requests.getUsers().then((res) => {
      console.log('returned getting users with res.data:', res.data)
      this.setState({users: res.data})
    })
  }

  RenderButtons = () => {
    let buttons = []
    this.state.users.forEach((user) => {
      buttons.push(<LoginButton username={user.username} setUsername={this.props.setUsername} />)
    })
    return buttons;
  }

  render() {
    let buttons = []
    if(this.state.users) {
      buttons = this.RenderButtons(); 
    }
    return (
      <div>
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
