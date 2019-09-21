import React, { Component } from 'react'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SeasonSelection from './SeasonSelection'

class PowerRankingWeekSelectionComponent extends Component {
  defaultSeason = 2019

  state = {
    selectedTab: this.props.weeks.length - 1,
    selectedSeason: this.defaultSeason
  }

  componentDidMount() {
    let latestWeekIndex = this.props.weeks.length - 1
    this.props.setWeekToDisplay(this.props.weeks[latestWeekIndex])
  }

  handleTabClick = (event, value) => {
    this.setState({ selectedTab: value })
  }

  setSeason = season => {
    this.setState({ selectedSeason: season })
  }

  renderWeeks = () => {
    let weeks = []

    this.props.weeks.forEach(week => {
      let weekLabel = 'Week ' + week
      weeks.push(
        <Tab
          key={week}
          label={weekLabel}
          onClick={() => {
            this.props.setWeekToDisplay(week)
          }}
        />
      )
    })

    return weeks
  }

  render() {
    return (
      <Tabs
        centered
        value={this.state.selectedTab}
        onChange={this.handleTabClick}
      >
        {this.renderWeeks()}
        <SeasonSelection
          selectedSeason={this.state.selectedSeason}
          setSeason={this.setSeason}
        />
      </Tabs>
    )
  }
}

export default PowerRankingWeekSelectionComponent
