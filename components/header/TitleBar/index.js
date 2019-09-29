import React, { useState } from 'react';
import classNames from 'classnames';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import SortIcon from '@material-ui/icons/Sort';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

const useSortStyles = makeStyles(({ layout }) => ({
  text: {
    textTransform: 'capitalize',
    padding: '0 0.5rem'
  }
}));

const Sort = () => {
  const [anchor, setAnchor] = useState(null);
  const [sortOrder, setSortOrder] = useState('default');
  const classes = useSortStyles();

  const handleClose = () => {
    setAnchor(null);
  };

  const handleSelect = (order, { target }) => {
    setSortOrder(order);
    handleClose();
  };

  const handleClick = ({ currentTarget }) => {
    setAnchor(currentTarget);
  };

  return (
    <>
      <div className="sortContainer" onClick={handleClick}>
        <SortIcon />
        <Typography variant="h6" className={classes.text}>
          {sortOrder}
        </Typography>
      </div>
      <Menu anchorEl={anchor} open={!!anchor} onClose={handleClose}>
        <MenuItem onClick={handleSelect.bind(null, 'default')}>
          Default
        </MenuItem>
        <MenuItem onClick={handleSelect.bind(null, 'top')}>Top</MenuItem>
        <MenuItem onClick={handleSelect.bind(null, 'new')}>New</MenuItem>
        <MenuItem onClick={handleSelect.bind(null, 'controversial')}>
          Controversial
        </MenuItem>
      </Menu>
    </>
  );
};

export default ({ title, sort }) => {
  const classes = useStyles();

  return (
    <div className="titleBar-container">
      <div className="titlebar-flex">
        <Typography className={classes.title}>{title}</Typography>
        {sort && <Sort />}
      </div>

      <div className={classes.divider}>
        <Divider />
      </div>
    </div>
  );
};
