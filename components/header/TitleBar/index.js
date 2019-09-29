import React from 'react';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
  }
}));

export default ({ title }) => {
  const classes = useStyles();

  return (
    <>
      <div className="titlebar-flex">
        <Typography className={classes.title}>{title}</Typography>
        <Search />
      </div>

      <div className={classes.divider}>
        <Divider />
      </div>
    </>
  );
};
