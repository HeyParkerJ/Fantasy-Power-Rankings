import React from 'react'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import PowerRankingsAggregateCard from './PowerRankingsAggregateCard'
import RankingsUtils from './utils/RankingsUtils'

let AggregatePowerRankingsContainer = (props) => {
  let aggregateRankings = RankingsUtils.createAggregateRankings(props.rankings)

  return (
    <Grid item>
      <PowerRankingsAggregateCard key="aggregate" rankings={aggregateRankings} users={props.users}/>
    </Grid>
  )
}

AggregatePowerRankingsContainer.propTypes = {
  users: PropTypes.array,
}

export default AggregatePowerRankingsContainer
