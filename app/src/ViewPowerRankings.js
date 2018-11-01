import React, { Component } from 'react'
import Requests from './http/requests'
import PowerRankingWeekSelectionComponent from './PowerRankingWeekSelectionComponent'
import PowerRankingComponent from './PowerRankingComponent'

class ViewPowerRankings extends Component {
  constructor() {
    super()
    this.state = {
      rankingsList: null,
      selectedWeek: null,
      // TODO - make latest
    }
  }

  componentDidMount() {
    Requests.getAllPowerRankings().then(res => {
      this.setState({ rankingsList: res })
    })
  }

  setWeekToDisplay = week => {
    this.setState({ selectedWeek: week })
  }

  renderWeekSelection = () => {
    let weeksWithSubmissions = []


    if(this.state.rankingsList) {
      Object.keys(this.state.rankingsList).forEach((week,index) => {
        weeksWithSubmissions.push(week);
      })
    } else {
      return <p>Placeholder until we get the weeks back</p>
    }

    return <PowerRankingWeekSelectionComponent weeks={weeksWithSubmissions} handleClick={this.setWeekToDisplay}/>
  }

  renderSelectedWeek = () => {
    let rankings = []

    if(this.state.selectedWeek && this.state.rankingsList) {
      this.state.rankingsList[this.state.selectedWeek].forEach((ranking) => {
        rankings.push(<PowerRankingComponent key={ranking.teamId} ranking={ranking} />)
      })
    }
    return rankings
  }

  render() {
    return (
      <div>
        {this.renderWeekSelection()}
        {this.renderSelectedWeek()}
      </div>
    )
  }
}
export default ViewPowerRankings
