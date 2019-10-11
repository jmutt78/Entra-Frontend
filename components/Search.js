import React, { useState, useEffect } from 'react';
import capitalize from 'lodash/capitalize';
import { withRouter } from 'next/router';

import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

import { usePageContext } from './layout';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
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

const CustomizedInputBase = ({ router }) => {
  const classes = useStyles();
  const [fieldState, setFieldState] = useState('');
  const { setSearchTerm, setSearchScope, searchScope } = usePageContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handMenuSelect = scope => {
    setSearchScope(scope);
    handleMenuClose();
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      setSearchTerm(fieldState);
    }
  };

  return (
    <>
      <Paper className={classes.root}>
        <IconButton
          className={classes.iconButton}
          aria-label="menu"
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder={`Search ${capitalize(searchScope)}`}
          inputProps={{ 'aria-label': 'search question' }}
          onChange={({ target: { value } }) => setFieldState(value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={() => setSearchTerm(fieldState)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handMenuSelect('all')}>Search All</MenuItem>
        <MenuItem onClick={() => handMenuSelect('titles')}>
          Search Titles
        </MenuItem>
        <MenuItem onClick={() => handMenuSelect('authors')}>
          Search Authors
        </MenuItem>
        <MenuItem onClick={() => handMenuSelect('tags')}>Search Tags</MenuItem>
      </Menu>
    </>
  );
};

export default withRouter(CustomizedInputBase);
