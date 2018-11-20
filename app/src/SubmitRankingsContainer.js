import React, { Component } from 'react'
import PropTypes from 'prop-types';
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
    this.setState({ isLoggedIn: true, user: user })
  }

  render() {
    return (
      <div>
        <p>
          Submit rankings for the week. Closes on Thursday at 5pm Parker time.
        </p>
        {this.state.isLoggedIn && this.state.user
         ?
         <RankingSelectionContainer
           user={this.state.user}
           rankingsList={this.props.rankingsList}
         />
         :
          <LoginComponent setUser={this.setUser} />
        }
      </div>
    )
  }
}

SubmitRankingsContainer.propTypes = {
  rankingsList: PropTypes.object,
}

export default SubmitRankingsContainer
