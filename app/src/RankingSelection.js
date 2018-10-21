import React, { Component } from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import Requests from './http/requests';

const SortableItem = SortableElement(
  ({value}) =>
    <li>{value.username}</li>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
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

  componentDidMount() {
    Requests.getTeams().then((res) => {
      this.setState({orderedTeams: res.data})
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      teams: arrayMove(this.state.teams, oldIndex, newIndex),
    })
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
      </div>
    )
  }
}

export default RankingSelection;
