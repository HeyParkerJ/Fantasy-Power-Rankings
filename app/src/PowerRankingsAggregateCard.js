import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import RankingsUtils from './utils/RankingsUtils'

import { withStyles } from '@material-ui/core/styles';
import emoji from "emoji-dictionary";
/*
  We handle the intake of a rankings array differently for aggregate rankings.
  Because aggregate rankings are a different data type (with calculated metrics attached)
  We have to process them into an object and perform various calculations
  This is broken into the intake and conversion phase, the processing phase, and the output phase
  */
const renderRankings = (rankings, users) => {
  // Intake
  let rankingRows = []
  let placementsArray = []
  for (let placement in rankings) {
    placementsArray.push(rankings[placement])
  }

  // Sort in order of average
  placementsArray.sort((a, b) => {
    return a.rankingsAverage - b.rankingsAverage
  })

  // Processing
  placementsArray = RankingsUtils.appendEmojisToRankingsArray(placementsArray, users)
  placementsArray = RankingsUtils.appendTieAdjustedRankings(placementsArray)

  // TODO - process in a RankingUtil fn
  placementsArray.forEach((r, index) => {
    // Round to two decimals, only if needed
    let rankingsAverageRounded = Math.round(parseInt(r.rankingsAverage * 100)) / 100

    // Output
    rankingRows.push(
      <div key={index+1}>
        <strong>{r.tieAdjustedRanking}:</strong> {r.username} &nbsp; <span>{emoji.getUnicode(r.emoji)}</span> &nbsp; ({rankingsAverageRounded})
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
