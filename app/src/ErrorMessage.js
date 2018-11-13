import React from 'react'
import { withStyles } from '@material-ui/core/styles';

const ErrorMessage = (props) => {
  if(!props.message) {
    return null
  } else {
    return (
      <div>
        <p>Error returned from server</p>
        <p>{props.message}</p>
      </div>
    )
  }
}

export default withStyles(null)(ErrorMessage)
