import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'

import { withStyles } from '@material-ui/core/styles';

let AggregatePowerRankingsCard = (props) => {
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

export default withStyles(styles)(AggregatePowerRankingsCard)
