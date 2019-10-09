import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
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

export default function CustomizedInputBase() {
  const classes = useStyles();
  const [fieldState, setFieldState] = useState('');
  const { setQuestionSearch } = usePageContext();
  useEffect(() => {
    setQuestionSearch('');
    // eslint-disable-next-line
  }, []);

  return (
    <Paper className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search questions"
        inputProps={{ 'aria-label': 'search question' }}
        onChange={({ target: { value } }) => setFieldState(value)}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={() => setQuestionSearch(fieldState)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
