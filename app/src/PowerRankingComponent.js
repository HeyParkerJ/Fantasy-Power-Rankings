import React, { Component } from 'react'

class PowerRankingComponent extends Component {

  renderVoter = () => {
    let team = this.props.ranking.teamId
    return (<div> Team: {team} </div>)
  }

  renderRankings = () => {
    let rankings = this.props.ranking.rankings[0]
    let rankingLines = []
    rankings.forEach((r, index) => {
      //let emoji = String.fromCodePoint(parseInt (r.emoji, 16))
      rankingLines.push(
          <div>
            {index+1}: {r.username}
          </div>
      )
    })
    return (
        <div>
          {rankingLines}
        </div>
    )
  }

  render() {
    console.log('props', this.props.ranking)
    return (
      <div>
        { this.renderVoter() }
        ---
        { this.renderRankings() }
      </div>
    )
  }
}

export default PowerRankingComponent
