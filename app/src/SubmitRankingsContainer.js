import React, { Component } from 'react';
import RankingSelectionContainer from './RankingSelectionContainer'
import Requests from './http/requests';

class LoginButton extends Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      username: undefined,
      users: undefined,
    }
  }

  render() {
    return (
      <button onClick={this.login}>{this.props.username}</button>
    )
  }
}


class SubmitRankingsContainer extends Component {

  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      username: undefined,
      users: undefined,
    }
  }

  componentDidMount() {
    Requests.getUsers().then((res) => {
      console.log('returned getting users with res.data:', res.data)
      this.setState({users: res.data})
    })
  }

  login = (username) => {
    let data = {
      username: username,
      password: 'prkr',
    }

    Requests.loginUser(data).then((res) => {
      this.setState({isLoggedIn: true, username: res.data[0].username})
    })

  }

  RenderButtons = () => {
    let buttons = []
    this.state.users.forEach((user) => {
       buttons.push(<LoginButton username={user.username}/>)
    })
    return buttons;
  }

  render() {
    let buttons = []
    if(this.state.users) {
      console.log('we have users', this.state.users)
      buttons = this.RenderButtons(); 
    }
    return (
        <div>
          <p>Submit rankings for the week. Closes on Thursday at 5pm Parker time.</p>
          {this.state.isLoggedIn ? <p>Logged in as: {this.state.username}</p> : null}
          <RankingSelectionContainer />
          {buttons}
        </div>
    )
  }

}
export default SubmitRankingsContainer;
