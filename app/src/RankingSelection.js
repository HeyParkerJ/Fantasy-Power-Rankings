import React, { Component } from 'react'
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc'
import Requests from './http/requests'

const SortableItem = SortableElement(({ value, sortIndex }) =>
                                     <li style={{"listStyleType":"none",
                                                 "border":"1px solid black",
                                                 "maxWidth": "85px",
                                                 "margin-top": "2px",
                                                 "margin-bottom": "2px",
                                                }}>
                                       {sortIndex+1}: {value.username}
                                     </li>)

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
          <button onClick={this.submitPowerRankings}>
            Submit Power Rankings
          </button>
        </div>
      </div>
    )
  }
}

export default RankingSelection
