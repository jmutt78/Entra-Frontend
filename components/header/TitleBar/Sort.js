import React, { useState } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { usePageContext } from '../../layout';

const useStyles = makeStyles(({ layout }) => ({
  text: {
    textTransform: 'capitalize',
    padding: '0 0.5rem'
  }
}));

const Sort = () => {
  const [anchor, setAnchor] = useState(null);
  const { sortBy, setSortBy } = usePageContext();
  const classes = useStyles();

  const handleClose = () => {
    setAnchor(null);
  };

  const handleSelect = (order, { target }) => {
    setSortBy(order);
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
          {sortBy}
        </Typography>
      </div>
      <Menu anchorEl={anchor} open={!!anchor} onClose={handleClose}>
        <MenuItem onClick={handleSelect.bind(null, 'default')}>
          Default
        </MenuItem>
        <MenuItem disabled onClick={handleSelect.bind(null, 'top')}>
          Top
        </MenuItem>
        <MenuItem onClick={handleSelect.bind(null, 'new')}>New</MenuItem>
        <MenuItem disabled onClick={handleSelect.bind(null, 'controversial')}>
          Controversial
        </MenuItem>
        <MenuItem onClick={handleSelect.bind(null, 'old')}>Old</MenuItem>
      </Menu>
    </>
  );
};

export default Sort;
