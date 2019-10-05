import React, { Component } from 'react';
import DataDisplay from './DataDisplay';
import Requests from './http/requests';

class SeasonContainer extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }

  handleClick = () => {
    Requests.getDataForSeason(this.props.season).then(res => {
      this.setState({ data: res });
    });
  };

  render() {
    let dataDisplay = this.state.data ? (
      <DataDisplay data={this.state.data} />
    ) : null;
    return (
      <div>
        <button onClick={this.handleClick}>{this.props.season}</button>
        {dataDisplay}
      </div>
    );
  }
}

export default SeasonContainer;
