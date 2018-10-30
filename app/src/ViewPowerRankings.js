import React, { Component } from 'react'
import Requests from './http/requests'
import PowerRankingComponent from './PowerRankingComponent'

class ViewPowerRankings extends Component {
  constructor() {
    super()
    this.state = {
      rankingsList: null
    }
  }

  componentDidMount() {
    Requests.getPowerRankings().then(res => {
      this.setState({ rankingsList: res })
    })
  }

  renderRankings = () => {
    let rankingsDiv = []
    if(this.state.rankingsList) {
      this.state.rankingsList.forEach((ranking) => {
        rankingsDiv.push(<PowerRankingComponent key={ ranking.teamId } ranking={ranking}/>)
      })
    } else {
      rankingsDiv.push(<p>Imagine these are the power rankings</p>)
    }
    return rankingsDiv
  }
  render() {
    return (
      <div>
        {this.renderRankings()}
      </div>
    )
  }
}
export default ViewPowerRankings
