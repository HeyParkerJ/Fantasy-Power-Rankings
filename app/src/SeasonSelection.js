import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function SeasonSelection(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    props.setSeason(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <form autoComplete="off">
      <FormControl className={classes.formControl}>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={props.selectedSeason}
          onChange={handleChange}
          renderValue={selected => {
            return selected;
          }}
          inputProps={{
            name: 'season',
            id: 'season-selection'
          }}
        >
          <MenuItem disabled value="">
            <em>Season</em>
          </MenuItem>
          <MenuItem value={2019}>2019</MenuItem>
          <MenuItem value={2018}>2018</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}
