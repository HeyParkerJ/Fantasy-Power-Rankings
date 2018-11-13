import React, { Component } from 'react'
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
      teams: props.teams,
      status: null
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
        <SortableList teams={this.state.teams} onSortEnd={this.onSortEnd} />
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

export default RankingSelection
