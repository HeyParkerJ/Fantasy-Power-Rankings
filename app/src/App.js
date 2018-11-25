import React, { Component } from 'react'
import './App.css'
import RawData from './RawData'
import PowerRankings from './PowerRankings'
import AppBar from '@material-ui/core/AppBar'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'

class TabsContainer extends Component {
  state = {
    selectedTab: 0
  }

  handleTabClick = (event, value) => {
    this.setState({selectedTab: value})
  }

  render() {
    return (
      <Tabs centered value={this.state.selectedTab} onChange={this.handleTabClick}>
        <Tab label="Power Rankings" component={Link} to="/powerRankings"/>
        <Tab label="Raw Data" component={Link} to="/raw"/>
      </Tabs>
    )
  }
}

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar position="static" color="default">
            <TabsContainer />
          </AppBar>

          <Route exact path="/" render={() => (
            <Redirect to="/powerRankings/view"/>
          )}/>
          <Route path="/raw" component={RawData} />
          <Route path="/powerRankings" component={PowerRankings} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
