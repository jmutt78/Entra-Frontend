import React, { useState, useEffect } from 'react';
import capitalize from 'lodash/capitalize';
import { withRouter } from 'next/router';

import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

import { usePageContext } from '../../layout';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: '-20px'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    paddingBottom: 15,
    marginTop: 5
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
    <div className="searchContainer">
      <div className={classes.root}>
        <TextField
          className={classes.input}
          placeholder={`Search ${capitalize(searchScope)}`}
          onChange={({ target: { value } }) => setFieldState(value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <IconButton
                className={classes.iconButton}
                aria-label="menu"
                onClick={handleMenuClick}
              >
                <MenuIcon />
              </IconButton>
            ),
            endAdornment: (
              <IconButton
                className={classes.iconButton}
                aria-label="search"
                onClick={() => setSearchTerm(fieldState)}
              >
                <SearchIcon />
              </IconButton>
            )
          }}
        />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handMenuSelect('all')}>Search All</MenuItem>
        <MenuItem onClick={() => handMenuSelect('titles')}>
          Search Titles
        </MenuItem>
        <MenuItem disabled onClick={() => handMenuSelect('authors')}>
          Search Authors
        </MenuItem>
        <MenuItem disabled onClick={() => handMenuSelect('tags')}>
          Search Tags
        </MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(CustomizedInputBase);
