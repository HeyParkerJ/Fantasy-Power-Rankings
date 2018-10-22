import React, { Component } from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import Requests from './http/requests';

const SortableItem = SortableElement(
  ({value}) =>
    <li>{value.username}</li>
);

const SortableList = SortableContainer(({teams}) => {
  return (
    <ul>
      {teams.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value}/>
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

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      teams: arrayMove(this.state.teams, oldIndex, newIndex),
    })
  }

  submitPowerRankings = () => {
    console.log('posting power rankings', this.props)
    Requests.postPowerRankings({teamId: this.props.teamId, rankings: this.state.teams})
  }

  render() {
    let teams = null
    if(this.state.teams) {
      teams = (
        <SortableList teams={this.state.teams} onSortEnd={this.onSortEnd}/>
      )
    }
    return (
      <div>
        {teams}
        <div>
          <button onClick={this.submitPowerRankings}>Submit Power Rankings</button>
        </div>
      </div>
    )
  }
}

export default RankingSelection;
