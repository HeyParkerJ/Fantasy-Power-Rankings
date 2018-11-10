import React, { Component } from 'react'

class PowerRankingWeekSelectionComponent extends Component {

  renderWeeks = () => {
    let weeks = []

    this.props.weeks.forEach((week) => {
      weeks.push(<button key={week} onClick={ () => {this.props.handleClick(week)} } >{week}</button>)
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
