import React, { Component } from 'react';
import './App.css';
import RawData from './RawData';
import PowerRankings from './PowerRankings';
import AppBar from '@material-ui/core/AppBar';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/powerRankings/view" />}
          />
          <Route path="/powerRankings" component={PowerRankings} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
