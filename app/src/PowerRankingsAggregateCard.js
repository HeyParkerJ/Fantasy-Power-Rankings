import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'

import { withStyles } from '@material-ui/core/styles';

const renderRankings = (rankings) => {
  let rankingRows = []

  // We want to keep the placements as an object to make averaging easier, but now we need it to
  // be an array so we can sort efficiently
  let placementsArray = []
  for (let placement in rankings) {
    placementsArray.push(rankings[placement])
  }

  placementsArray.sort((a, b) => {
    return a.rankingsAverage - b.rankingsAverage
  })

  placementsArray.forEach((r, index) => {
    //let emoji = String.fromCodePoint(parseInt (r.emoji, 16))
    rankingRows.push(
      <div>
        {index+1}: {r.username} ({r.rankingsAverage})
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

let PowerRankingsAggregateCard = (props) => {
  const { classes } = props
  return (
      <Card className={classes.card}>
        <CardHeader title='Aggregate'></CardHeader>
        { renderRankings(props.rankings) }
      </Card>
  )
}

export default withStyles(styles)(PowerRankingsAggregateCard)
