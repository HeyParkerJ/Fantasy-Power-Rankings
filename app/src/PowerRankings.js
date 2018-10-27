import React, { Component } from 'react'

import SubmitRankingsContainer from './SubmitRankingsContainer'
import ViewPowerRankings from './ViewPowerRankings'
import { Route, Link } from 'react-router-dom'

class PowerRankings extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/powerRankings/submit">Submit Rankings</Link>
          </li>
          <li>
            <Link to="/powerRankings/view">View Rankings</Link>
          </li>
        </ul>
        <Route
          path="/powerRankings/submit"
          component={SubmitRankingsContainer}
        />
        <Route path="/powerRankings/view" component={ViewPowerRankings} />
      </div>
    )
  }
}

export default PowerRankings
