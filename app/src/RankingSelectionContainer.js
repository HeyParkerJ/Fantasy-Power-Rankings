import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Requests from './http/requests';
import RankingSelection from './RankingSelection';

class RankingSelectionContainer extends Component {
  constructor() {
    super();
    this.state = {
      teams: undefined
    };
  }

  componentDidMount() {
    Requests.getTeams().then(res => {
      this.setState({ teams: res.data });
    });
  }

  render() {
    if (!this.state.teams) {
      return null;
    }
    return (
      <div>
        <RankingSelection
          teams={this.state.teams}
          teamId={this.props.user.teamId}
          rankingsList={this.props.rankingsList}
        />
      </div>
    );
  }
}

RankingSelectionContainer.propTypes = {
  rankingsList: PropTypes.object
};

export default RankingSelectionContainer;
