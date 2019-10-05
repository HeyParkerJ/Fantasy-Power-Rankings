import React, { Component } from 'react';
import SeasonContainer from './SeasonContainer';

class RawData extends Component {
  constructor() {
    super();
    this.state = {
      seasons: [2015, 2016, 2017, 2018]
    };
  }

  render() {
    let seasonComponents = [];
    this.state.seasons.forEach(season => {
      seasonComponents.push(
        <SeasonContainer key={`seasonContainer-` + season} season={season} />
      );
    });
    return <div className="RawData">{seasonComponents}</div>;
  }
}

export default RawData;
