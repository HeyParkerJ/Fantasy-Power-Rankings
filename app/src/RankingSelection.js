import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc'
import Requests from './http/requests'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'

import RankingsUtils from './utils/RankingsUtils'

const SortableItem = SortableElement(({ value, sortIndex }) =>
                                     <Paper style={{
                                                 "maxWidth": "85px",
                                                 "marginTop": "4px",
                                                 "marginBottom": "4px",
                                                }}>
                                       {sortIndex+1}: {value.username}
                                     </Paper>)

const SortableList = SortableContainer(({ teams }) => {
  return (
    <ul>
      {teams.map((value, index) => (
        <SortableItem
          key={`item-${index}`}//`; this fixes chrome debugger breaking on backticks
          index={index}
          sortIndex={index}
          value={value}
        />
      ))}
    </ul>
  )
})

class RankingSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: this.sortTeams(),
      status: null
    }
  }

  getMostRecentSubmissionFromTeam = () => {
    let keys = Object.keys(this.props.rankingsList).map((k) => {
      return parseInt(k)
    })
    let latestWeekId = Math.max.apply(Math, keys)
    let latestWeek = this.props.rankingsList[latestWeekId]

    let mostRecentSubmission = null

    latestWeek.forEach((week) => {
      if(week.teamId === this.props.teamId) {
        mostRecentSubmission = week.rankings[0]
      }
    })

    return mostRecentSubmission
  }

  sortTeams = () => {
    let keys = Object.keys(this.props.rankingsList).map((k) => {
      return parseInt(k)
    })
    let latestWeekId = Math.max.apply(Math, keys)

    let mostRecentSubmission = this.getMostRecentSubmissionFromTeam()
debugger
    if(mostRecentSubmission === null) {
      let aggregateRankings = RankingsUtils.createAggregateRankings(this.props.rankingsList[latestWeekId])
      // AggregateRankings comes back as an object so we need to make it an ordered array
      let sortedAggregateRankings = RankingsUtils.createAggregateRankingsArray(aggregateRankings);
      mostRecentSubmission = sortedAggregateRankings
    }

    let latestRankings = []
    mostRecentSubmission.forEach((r) => {
      latestRankings.push(parseInt(r.teamId))
    })

    function mapOrder (array, order, key) {
      array.sort( function (a, b) {
        var A = a[key], B = b[key];
        if (order.indexOf(A) > order.indexOf(B)) {
          return 1;
        } else {
          return -1;
        }
      });
      return array
    };

    return mapOrder(this.props.teams, latestRankings, 'teamId')
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      teams: arrayMove(this.state.teams, oldIndex, newIndex)
    })
  }

  submitPowerRankings = () => {
    Requests.postPowerRankings({
      teamId: this.props.teamId,
      rankings: this.state.teams
    }).then((res) => {
      this.setState({
        status: res
      })
    })
  }

  renderError = () => {
    if(this.state.status && this.state.status.status !== 200 ) {
      return <ErrorMessage message={this.state.status.data} />
    } else {
      return null
    }
  }
  renderSuccess = () => {
    if(this.state.status && this.state.status.status === 200) {
      return <SuccessMessage message={this.state.status.data} />
    } else {
      return null
    }
  }


  render() {
    let teams = null
    if (this.state.teams) {
      teams = (
        <SortableList
          teams={this.state.teams}
          onSortEnd={this.onSortEnd}
        />
      )
    }
    return (
      <div>
        <div style={{'color':'red'}}>Drag and drop, then click submit</div>
        {teams}
        <div>
          {this.renderError()}
          {this.renderSuccess()}
          <Button
            onClick={this.submitPowerRankings}
            color="primary"
            variant="contained"
          >
            Submit Power Rankings
          </Button>
        </div>
      </div>
    )
  }
}

RankingSelection.propTypes = {
  rankingsList: PropTypes.object,
  teams: PropTypes.object,
}

export default RankingSelection
