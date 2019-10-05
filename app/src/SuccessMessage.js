import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const SuccessMessage = props => {
  if (!props.message) {
    return null;
  } else {
    return (
      <div>
        <p>{props.message}</p>
      </div>
    );
  }
};

export default withStyles(null)(SuccessMessage);
