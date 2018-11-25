import React, { Component } from 'react'

import SubmitRankingsContainer from './SubmitRankingsContainer'
import ViewPowerRankings from './ViewPowerRankings'
import { Route, Link } from 'react-router-dom'

import Requests from './http/requests'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class PowerRankings extends Component {
  state = {
    selectedTab: 0,
    rankingsList: null,
    selectedWeek: null,
  }

  componentDidMount() {
    Requests.getAllPowerRankings().then(res => {
      let keysArray = []
      Object.keys(res).forEach((k) => {
        keysArray.push(parseInt(k))
      })
      keysArray.sort((a, b) => {
        return parseInt(a) - parseInt(b)
      })
      this.setState({
        rankingsList: res,
        selectedWeek: res[keysArray.length-1]
      })
    })
  }

  setWeekToDisplay = week => {
    this.setState({ selectedWeek: week })
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
               render={(props) =>
                       <ViewPowerRankings
                         rankingsList={this.state.rankingsList}
                         selectedWeek={this.state.selectedWeek}
                         setWeekToDisplay={this.setWeekToDisplay}
                       />
                      }
        />
        <Route path="/powerRankings/submit"
               render={(props) =>
                       <SubmitRankingsContainer
                         rankingsList={this.state.rankingsList}
                       />
                      }
        />
      </div>
   )
  }
}

export default PowerRankings
