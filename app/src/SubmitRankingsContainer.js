import React, { Component } from 'react';
import RankingSelectionContainer from './RankingSelectionContainer'
import LoginComponent from './LoginComponent'


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
