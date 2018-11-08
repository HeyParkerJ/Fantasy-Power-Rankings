import React, { Component } from 'react'
import './App.css'
import RawData from './RawData'
import PowerRankings from './PowerRankings'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
    <p>
      To be honest I'm not sure what this segment is gonna look like yet but it
      should probably be here. Pick something else
    </p>
  </div>
)

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/raw">Raw Data</Link>
        </li>
        <li>
          <Link to="/powerRankings">Power Rankings</Link>
        </li>
      </ul>

      <Route exact path="/" component={Home} />
      <Route path="/raw" component={RawData} />
      <Route path="/powerRankings" component={PowerRankings} />
    </div>
  </Router>
)

export default App
