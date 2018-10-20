import React, { Component } from 'react';
import RankingSelectionContainer from './RankingSelectionContainer'
import Requests from './http/requests';

const SubmitRankingsContainer = () => (
  <div>
    <p>Submit rankings for the week. Closes on Thursday at 5pm Parker time.</p>
    <RankingSelectionContainer />
  </div>
)


class PowerRankings extends Component {
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
          {this.state.isLoggedIn ? <p>Logged in as: {this.state.username}</p> : null}
          <SubmitRankingsContainer />
          {/*<RankingsDisplayContainer/>*/}
          <button onClick={this.login}>Login</button>
        </div>
    )
  }
}

export default PowerRankings;
