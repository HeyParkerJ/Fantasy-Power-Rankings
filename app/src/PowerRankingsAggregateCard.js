import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import RankingsUtils from './utils/RankingsUtils'

import { withStyles } from '@material-ui/core/styles';
import emoji from "emoji-dictionary";

const renderRankings = (rankings, users) => {
  let rankingRows = []

  // We want to keep the placements as an object to make averaging & data storage easier,
  // but now we need it to be an array so we can sort and loop efficiently
  let placementsArray = []
  for (let placement in rankings) {
    placementsArray.push(rankings[placement])
  }

  placementsArray.sort((a, b) => {
    return a.rankingsAverage - b.rankingsAverage
  })

  placementsArray = RankingsUtils.appendEmojisToRankingsArray(placementsArray, users)

  placementsArray.forEach((r, index) => {
    // Round to two decimals, only if needed
    let rankingsAverageRounded = Math.round(parseInt(r.rankingsAverage * 100)) / 100

    rankingRows.push(
      <div key={index+1}>
        {index+1}: {r.username} &nbsp; <span>{emoji.getUnicode(r.emoji)}</span> &nbsp; ({rankingsAverageRounded})
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
    marginBottom: '20px',
    marginTop: '20px',
    backgroundColor: '#DAA520',
  }
}

let PowerRankingsAggregateCard = (props) => {
  const { classes } = props
  return (
      <Card className={classes.card}>
        <CardContent>
          <CardHeader title='Aggregate'></CardHeader>
          { renderRankings(props.rankings, props.users) }
        </CardContent>
      </Card>
  )
}

export default withStyles(styles)(PowerRankingsAggregateCard)
