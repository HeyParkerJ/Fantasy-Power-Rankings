import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { withStyles } from '@material-ui/core/styles';

class PowerRankingComponent extends Component {

  renderVoter = () => {
    let team

    this.props.users.forEach((t) => {
      if(t.teamId === this.props.ranking.teamId) {
        team = t
      }
    })

    return (<CardHeader title={`Submitter: ` + team.username}></CardHeader>)
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
    return (
      <Card style={{maxWidth: '275'}}>
        { this.renderVoter() }
        { this.renderRankings() }
      </Card>
    )
  }
}
let renderVoter = (users, teamId) => {
  let team

  users.forEach((t) => {
    if(t.teamId === teamId) {
      team = t
    }
  })

  return (<CardHeader title={`Submitter: ` + team.username}></CardHeader>)
}

let renderRankings = (rankings) => {
  console.log(rankings)
  rankings = rankings.rankings[0]
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

const styles = {
  card: {
    maxWidth: 275,
  }
}

let FNpowerRankingComponent = (props) => {
  const { classes } = props

  return (
    <Card className={classes.card}>
      { renderVoter(props.users, props.ranking.teamId) }
      { renderRankings(props.ranking) }
    </Card>
  )
}

export default withStyles(styles)(FNpowerRankingComponent)
