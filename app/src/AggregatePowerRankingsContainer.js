import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import PowerRankingsAggregateCard from './PowerRankingsAggregateCard'

const createAggregateRankings = (rankings) => {
  let aggregateRankingsObject = {}
  rankings.forEach((ranking) => {
    ranking.rankings[0].forEach((rank, index) => {
      index++
      let teamId = rank.teamId
      if(!aggregateRankingsObject.hasOwnProperty(teamId)) {
        aggregateRankingsObject[teamId] = {
          username: rank.username,
          rankingsArray: [index],
          rankingsAverage: [index],
          teamId: teamId
        }
      } else {
        let arr = aggregateRankingsObject[teamId].rankingsArray
        arr.push(index)

        if (arr.length) {
          let sum = arr.reduce(function(a, b) { return a + b; });
          let avg = sum / arr.length;
          aggregateRankingsObject[teamId].rankingsAverage = avg
        }
      }
    })
  })

  return aggregateRankingsObject
}

let AggregatePowerRankingsContainer = (props) => {
  let aggregateRankings = createAggregateRankings(props.rankings)

  return (
    <Grid item>
        <PowerRankingsAggregateCard key="aggregate" rankings={aggregateRankings}/>
    </Grid>
  )
}

export default AggregatePowerRankingsContainer
