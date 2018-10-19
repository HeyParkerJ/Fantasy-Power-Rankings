import React, { Component } from 'react';
import RankingSelectionContainer from './RankingSelectionContainer'
import Requests from './http/requests';

const SubmitRankingsContainer = () => (
  <div>
    <p>Submit rankings for the week. Closes on Thursday at 5pm Parker time.</p>
    <RankingSelectionContainer />
  </div>
)


class PowerRankings extends Component {

  sendTestData = () => {
    let data = {
      firstName: 'Parker',
      isTestData: true,
      mockingbird: 'yea',
    }

    let request = Requests.sendTestData(data);
    request.then((res) => {
      this.setState({data: res.data})
    })
  }

  render() {
    return (
        <div>
          <SubmitRankingsContainer />
          {/*<RankingsDisplayContainer/>*/}
          <button onClick={this.sendTestData}>SendTestData</button>
        </div>
    )
  }
}

export default PowerRankings;
