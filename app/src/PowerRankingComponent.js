import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'

import { withStyles } from '@material-ui/core/styles';

const renderVoter = (users, teamId) => {
  let team

  users.forEach((t) => {
    if(t.teamId === teamId) {
      team = t
    }
  })

  return (<CardHeader title={`Submitter: ` + team.username}></CardHeader>)
}

const renderRankings = (rankings) => {
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

let PowerRankingComponent = (props) => {
  const { classes } = props

  return (
    <Grid item>
      <Card className={classes.card}>
        { renderVoter(props.users, props.ranking.teamId) }
        { renderRankings(props.ranking) }
      </Card>
    </Grid>
  )
}

export default withStyles(styles)(PowerRankingComponent)
