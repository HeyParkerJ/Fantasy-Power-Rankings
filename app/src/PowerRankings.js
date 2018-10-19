import React, { Component } from 'react';
import RankingSelectionContainer from './RankingSelectionContainer'

const SubmitRankingsContainer = () => (
  <div>
    <p>Submit rankings for the week. Closes on Thursday at 5pm Parker time.</p>
    <RankingSelectionContainer />
  </div>
)

class PowerRankings extends Component {
  render() {
    return (
        <div>
          <SubmitRankingsContainer />
          {/*<RankingsDisplayContainer/>*/}
        </div>
    )
  }
}

export default PowerRankings;
