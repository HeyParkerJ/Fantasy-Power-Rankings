import React, { Component } from 'react'

import SubmitRankingsContainer from './SubmitRankingsContainer'
import ViewPowerRankings from './ViewPowerRankings'
import { Route, Link } from 'react-router-dom'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class PowerRankings extends Component {
  state = {
    selectedTab: 0
  }

  handleTabClick = (event, value) => {
    this.setState({selectedTab: value})
  }

  renderTabs = () => {
    return (
      [
        <Tab key={1} component={Link} to="/powerRankings/view" label="View Rankings" />,
        <Tab key={2} component={Link} to="/powerRankings/submit" label="Submit Rankings" />,
      ]
    )
  }

  render() {
    return (
      <div>
        <Tabs centered value={this.state.selectedTab} onChange={this.handleTabClick}>
          {this.renderTabs()}
        </Tabs>
        <Route path="/powerRankings/view"
               component={ViewPowerRankings}
        />
        <Route path="/powerRankings/submit"
                component={SubmitRankingsContainer}
        />
      </div>
   )
  }
}

export default PowerRankings
