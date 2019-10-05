import React, { Component } from 'react';
import RankingSelectionContainer from './RankingSelectionContainer';
import LoginComponent from './LoginComponent';
import Requests from './http/requests';

class SubmitRankingsContainer extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: undefined,
      username: '',
      rankingsList: null
    };
  }

  componentDidMount() {
    Requests.getAllPowerRankingsForCurrentSeason().then(res => {
      this.setState({
        rankingsList: res
      });
    });
  }

  setUser = user => {
    this.setState({ isLoggedIn: true, user: user });
  };

  render() {
    return (
      <div>
        <p>
          Submit rankings for the week. Closes on Thursday at 5pm Parker time.
        </p>
        {this.state.isLoggedIn && this.state.user ? (
          <RankingSelectionContainer
            user={this.state.user}
            rankingsList={this.state.rankingsList}
          />
        ) : (
          <LoginComponent setUser={this.setUser} />
        )}
      </div>
    );
  }
}

export default SubmitRankingsContainer;
