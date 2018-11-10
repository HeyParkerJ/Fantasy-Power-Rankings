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
  rankings = rankings.rankings[0]
  let rankingRows = []
  rankings.forEach((r, index) => {
    //let emoji = String.fromCodePoint(parseInt (r.emoji, 16))
    rankingRows.push(
      <div>
        {index+1}: {r.username}
      </div>
    )
  })
  return (
    <div>
      {rankingRows}
    </div>
  )
}

const styles = {
  card: {
    maxWidth: 275,
  }
}

let PowerRankingsCard = (props) => {
  const { classes } = props

  return (
    <Grid item>
      <Card className={classes.card}>
        { renderVoter(props.users, props.rankings.teamId) }
        { renderRankings(props.rankings) }
      </Card>
    </Grid>
  )
}

export default withStyles(styles)(PowerRankingsCard)
