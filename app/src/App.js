import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: {},
      seasons: [2015, 2016, 2017, 2018]
    }
  }

  requestData = () => {
    Axios.get('http://localhost:1337/data/2018').then((res) => {
      this.setState({data: res.data})
    })
  }

  render() {
    return (
      <div className="App">
        <ButtonContainer seasons={this.state.seasons} />
      </div>
    );
  }
}

export default App;
