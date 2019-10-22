import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Requests from './http/requests';
import PowerRankingWeekSelectionComponent from './PowerRankingWeekSelectionComponent';
import PowerRankingsCard from './PowerRankingsCard';
import Grid from '@material-ui/core/Grid';
import AggregatePowerRankingsContainer from './AggregatePowerRankingsContainer';
import SeasonSelection from './SeasonSelection';

class ViewPowerRankings extends Component {
  constructor() {
    super();
    this.state = {
      users: null,
      rankingsList: null,
      selectedWeek: null,
      selectedSeason: 2019
    };
  }

  componentDidMount() {
    Requests.getTeams().then(res => {
      this.setState({ users: res.data });
    });
    this.requestPowerRankings();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedSeason !== this.state.selectedSeason) {
      this.requestPowerRankings();
    }
  }

  requestPowerRankings = () => {
    Requests.getAllPowerRankingsForSeason(this.state.selectedSeason).then(
      res => {
        let keysArray = Object.keys(res).sort((a, b) => {
          return parseInt(a) - parseInt(b);
        });

        this.setState({
          rankingsList: res,
            selectedWeek: Math.max(parseInt(...keysArray))
        });
      }
    );
  };

  setSeason = season => {
    this.setState({ selectedSeason: season });
  };

  setWeekToDisplay = week => {
    this.setState({ selectedWeek: week });
  };

  renderWeekSelection = () => {
    let weeksWithSubmissions = [];

    if (this.state.rankingsList) {
      Object.keys(this.state.rankingsList).forEach((week, index) => {
        weeksWithSubmissions.push(week);
      });
    } else {
      return <p>Placeholder until we get the weeks back</p>;
    }

    return (
      <PowerRankingWeekSelectionComponent
        weeks={weeksWithSubmissions}
        setWeekToDisplay={this.setWeekToDisplay}
      />
    );
  };

  renderSelectedWeek = () => {
    let rankings = [];

    if (
      this.state.selectedWeek &&
      this.state.rankingsList &&
      this.state.users
    ) {
      this.state.rankingsList[this.state.selectedWeek].forEach(ranking => {
        rankings.push(
          <PowerRankingsCard
            key={ranking.teamId}
            rankings={ranking}
            users={this.state.users}
          />
        );
      });
    }
    return rankings;
  };

  renderAggregatePowerRankingsContainer = () => {
    if (
      this.state.selectedWeek &&
      this.state.rankingsList &&
      this.state.users
    ) {
      return (
        <AggregatePowerRankingsContainer
          rankings={this.state.rankingsList[this.state.selectedWeek]}
          users={this.state.users}
        />
      );
    } else {
      return null;
    }
  };

  renderRankings = () => {
    let rankingsDiv = [];
    if (this.state.rankingsList) {
      this.state.rankingsList.forEach(ranking => {
        rankingsDiv.push(
          <PowerRankingsCard key={ranking.teamId} ranking={ranking} />
        );
      });
    } else {
      rankingsDiv.push(<p>Imagine these are the power rankings</p>);
    }
    return rankingsDiv;
  };

  render() {
    return (
      <div>
        {this.renderWeekSelection()}
        <SeasonSelection
          selectedSeason={this.state.selectedSeason}
          setSeason={this.setSeason}
        />

        <Grid container justify="center">
          {this.renderAggregatePowerRankingsContainer()}
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className="selectedWeekContainer"
          spacing={10}
        >
          {this.renderSelectedWeek()}
        </Grid>
      </div>
    );
  }
}

ViewPowerRankings.propTypes = {
  rankingsList: PropTypes.object,
  selectedWeek: PropTypes.string
};

export default ViewPowerRankings;
