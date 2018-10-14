import React, { Component } from 'react';
import './App.css';
import SeasonContainer from './SeasonContainer';
import DataDisplay from './DataDisplay';

class App extends Component {
  constructor() {
    super()
    this.state = {
      seasons: [2015, 2016, 2017, 2018]
    }
  }

  render() {
    let seasonComponents = []
    this.state.seasons.forEach((season) => {
      seasonComponents.push(
          <SeasonContainer key={`seasonContainer-`+season} season={season} />
      )
    })
    return (
      <div className="App">
        {seasonComponents}
      </div>
    );
  }
}

export default App;
