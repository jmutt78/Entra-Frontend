import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { withRouter } from 'next/router';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import Signout from './auth/Signout';

const useStyles = makeStyles(({ layout, palette }) => ({
  bigAvatar: {
    margin: 15,
    width: 35,
    height: 35,
    backgroundColor: '#85bdcb',
    cursor: 'pointer'
  },
  smallAvatar: {
    margin: 5,
    width: 25,
    height: 25
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 35px 0 0',
    fontSize: '1rem',
    alignSelf: 'flex-end',
    cursor: 'pointer'
  }
}));

const _Avatar = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const me = props.me;

  const handleClick = event => {
    if (props.linkToId) {
      props.router.push({
        pathname: '/user',
        query: { id: props.linkToId }
      });
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImage = (me, classes) => {
    if (!me) {
      return null;
    }
    if (me.image == null || me.image == '') {
      return (
        <Avatar
          className={props.small ? classes.smallAvatar : classes.bigAvatar}
        >
          {me.name[0]}
        </Avatar>
      );
    }
    return (
      <Avatar alt="Remy Sharp" src={me.image} className={classes.bigAvatar} />
    );
  };

  return (
    <div>
      <div
        className={classNames(classes.grow, 'nav-avatar')}
        onClick={props.small ? null : handleClick}
      >
        <Typography
          className={props.small ? null : classes.avatarContainer}
          component={'div'}
        >
          {handleImage(me, classes)}

          {props.small || props.compact ? null : <div>{me.name}</div>}

          {props.compact && <ArrowDropDownIcon />}
        </Typography>
      </div>

      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        open={Boolean(props.anchorEl)}
        onClose={handleClose}
      >
        <Link href="/account/myaccount">
          <MenuItem onClick={handleClose}>My Profile</MenuItem>
        </Link>
        <Link href="/account/editaccount">
          <MenuItem onClick={handleClose}>Edit Account</MenuItem>
        </Link>

        <MenuItem>
          <Signout />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(_Avatar);
