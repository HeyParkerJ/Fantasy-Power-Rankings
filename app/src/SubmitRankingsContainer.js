import React, { Component } from 'react';
import RankingSelectionContainer from './RankingSelectionContainer'
import Requests from './http/requests';

class SubmitRankingsContainer extends Component {

  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      username: undefined
    }
  }

  login = () => {
    let data = {
      username: 'Parker',
      password: 'prkr',
    }

    Requests.loginUser(data).then((res) => {
      this.setState({isLoggedIn: true, username: res.data[0].username})
    })

  }

  render() {
    return (
        <div>
          <p>Submit rankings for the week. Closes on Thursday at 5pm Parker time.</p>
          {this.state.isLoggedIn ? <p>Logged in as: {this.state.username}</p> : null}
          <button onClick={this.login}>Login</button>
          <RankingSelectionContainer />
        </div>
    )
  }

}
export default SubmitRankingsContainer;
