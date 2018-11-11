import React, { Component } from 'react'
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc'
import Requests from './http/requests'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

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
        <SortableItem key={`item-${index}`} index={index} sortIndex={index} value={value} />
      ))}
    </ul>
  )
})

class RankingSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teams: props.teams
    }
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
    })
  }

  render() {
    let teams = null
    if (this.state.teams) {
      teams = (
        <SortableList teams={this.state.teams} onSortEnd={this.onSortEnd} />
      )
    }
    return (
      <div>
        <div style={{'color':'red'}}>Drag and drop, then click submit</div>
        {teams}
        <div>
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

export default RankingSelection
