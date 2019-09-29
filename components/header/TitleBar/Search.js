import React from 'react';

import DirectionsIcon from '@material-ui/icons/Directions';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const Search = () => {
  const classes = useStyles();

  return (
    <Paper className="searchField">
      <IconButton className={classes.iconButton} aria-label="menu">
        <SortIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Questions"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
    </Paper>
  );
};

export default Search;
