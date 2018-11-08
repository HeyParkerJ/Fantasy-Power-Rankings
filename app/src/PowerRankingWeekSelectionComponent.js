import React, { Component } from 'react'
import Requests from './http/requests'

class PowerRankingWeekSelectionComponent extends Component {

  renderWeeks = () => {
    let weeks = []

    this.props.weeks.forEach((week) => {
      weeks.push(<button onClick={ () => {this.props.handleClick(week)} } >{week}</button>)
    })

    return weeks
  }

  render() {
    return (
      <div>
        {this.renderWeeks()}
      </div>
    )
  }
}

export default PowerRankingWeekSelectionComponent
