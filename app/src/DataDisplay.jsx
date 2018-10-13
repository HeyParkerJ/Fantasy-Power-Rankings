import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import Data from './data/2018.js';

class DataDisplay extends Component {
    render() {
        return (
            <ReactJson src={Data}/>
        )
    };
}

export default DataDisplay;
