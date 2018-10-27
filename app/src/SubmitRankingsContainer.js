import React, { Component } from 'react'
import RankingSelectionContainer from './RankingSelectionContainer'
import LoginComponent from './LoginComponent'

class SubmitRankingsContainer extends Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      user: undefined,
      username: ''
    }
  }

  setUser = user => {
    console.log('setting state', user)
    this.setState({ isLoggedIn: true, user: user })
    console.log('this.state', this.state)
  }

  render() {
    return (
      <div>
        <p>
          Submit rankings for the week. Closes on Thursday at 5pm Parker time.
        </p>
        {this.state.isLoggedIn && this.state.user ? (
          <RankingSelectionContainer user={this.state.user} />
        ) : (
          <LoginComponent setUser={this.setUser} />
        )}
      </div>
    )
  }
}
export default SubmitRankingsContainer
