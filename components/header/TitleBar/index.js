import React from 'react';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Sort from './Sort';
import Search from './Search';

import './index.css';

const useStyles = makeStyles(({ layout }) => ({
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
    textTransform: 'capitalize',
    fontWeight: 500,
    lineHeight: '3rem',
    padding: '0 0 0 1rem'
  },
  icon: {
    color: 'black'
  },
  divider: {
    padding: '15px 0'
  },
  searchContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export default ({ title, sort, search }) => {
  const classes = useStyles();

  return (
    <div className="titleBar-container">
      <div className="titlebar-flex">
        <Typography className={classes.title}>{title}</Typography>
        {sort && <Sort />}
      </div>

      <div className={classes.searchContainer}>{search && <Search />}</div>

      <div className={classes.divider}>
        <Divider />
      </div>
    </div>
  );
};
