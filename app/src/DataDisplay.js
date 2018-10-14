import React, { Component } from 'react';
import ReactJson from 'react-json-view';

class DataDisplay extends Component {
    render() {
        return (
          <ReactJson name='season'
                     src={this.props.data}
                     iconStyle='circle'
                     indentWidth={2}
                     collapsed={true}
                     collapseStringsAfterLength={120}
                     displayDataTypes={false}
          />
        )
    };
}

export default DataDisplay;
