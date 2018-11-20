import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Requests from './http/requests'
import PowerRankingWeekSelectionComponent from './PowerRankingWeekSelectionComponent'
import PowerRankingsCard from './PowerRankingsCard'
import Grid from '@material-ui/core/Grid'
import AggregatePowerRankingsContainer from './AggregatePowerRankingsContainer'

class ViewPowerRankings extends Component {
  constructor() {
    super()
    this.state = {
      users: null,
    }
  }

  componentDidMount() {
    Requests.getTeams().then(res => {
      this.setState({ users: res.data })
    })
  }


  renderWeekSelection = () => {
    let weeksWithSubmissions = []

    if(this.props.rankingsList) {
      Object.keys(this.props.rankingsList).forEach((week,index) => {
        weeksWithSubmissions.push(week);
      })
    } else {
      return <p>Placeholder until we get the weeks back</p>
    }

    return <PowerRankingWeekSelectionComponent
             weeks={weeksWithSubmissions}
             setWeekToDisplay={this.props.setWeekToDisplay}
           />
  }

  renderSelectedWeek = () => {
    let rankings = []

    if(this.props.selectedWeek && this.props.rankingsList && this.state.users) {
      this.props.rankingsList[this.props.selectedWeek].forEach((ranking) => {
        rankings.push(<PowerRankingsCard key={ranking.teamId} rankings={ranking} users={this.state.users} />)
      })
    }
    return rankings
  }

  renderAggregatePowerRankingsContainer = () => {
    if(this.props.selectedWeek && this.props.rankingsList && this.state.users) {
      return <AggregatePowerRankingsContainer rankings={this.props.rankingsList[this.props.selectedWeek]}/>
    } else {
      return null
    }
  }

  renderRankings = () => {
    let rankingsDiv = []
    if(this.props.rankingsList) {
      this.props.rankingsList.forEach((ranking) => {
        rankingsDiv.push(<PowerRankingsCard key={ ranking.teamId } ranking={ranking}/>)
      })
    } else {
      rankingsDiv.push(<p>Imagine these are the power rankings</p>)
    }
    return rankingsDiv
  }

  render() {
    return (
      <div>
        {this.renderWeekSelection()}
        <Grid
          container
          justify='center'
        >
          {this.renderAggregatePowerRankingsContainer()}
        </Grid>

        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          className='selectedWeekContainer'
          spacing={16}
        >
         {this.renderSelectedWeek()}
        </Grid>
      </div>
    )
  }
}

ViewPowerRankings.propTypes = {
  rankingsList: PropTypes.object,
  selectedWeek: PropTypes.string,
  setWeekToDisplay: PropTypes.func,
}

export default ViewPowerRankings
