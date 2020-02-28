import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { withRouter } from 'next/router';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import Signout from './auth/Signout';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

  bigAvatar: {
    margin: 15,
    width: 45,
    height: 45,
    backgroundColor: '#85bdcb',
    cursor: 'pointer'
  },
  smallAvatar: {
    margin: 15,
    width: 45,
    height: 45,
    backgroundColor: '#85bdcb',
    cursor: 'pointer'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 17px 0 0',
    fontSize: '1rem',
    alignSelf: 'flex-end',
    cursor: 'pointer',
    fontWeight: 600
  },
  menu: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#6f6f6f',
    textDecoration: 'none'
  }
}));

export default function MyProfile({ me, small }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  function handleImage(me, classes) {
    if (!me) {
      return null;
    }
    if (me.image == null || me.image == '') {
      return (
        <Avatar className={small ? classes.smallAvatar : classes.bigAvatar}>
          {me.name[0]}
        </Avatar>
      );
    }
    return (
      <Avatar alt="Remy Sharp" src={me.image} className={classes.bigAvatar} />
    );
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <div
          className={classNames(classes.grow, 'nav-avatar')}
          onClick={small ? null : handleToggle}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
        >
          <Typography
            className={small ? null : classes.avatarContainer}
            component={'div'}
          >
            {handleImage(me, classes)}
            {small ? null : (
              <div>
                <ArrowDropDownIcon />
              </div>
            )}
          </Typography>
        </div>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>
                      <Link href="/account/myaccount">
                        <a className={classes.menu}>My Profile</a>
                      </Link>
                    </MenuItem>

                    <Divider />

                    <a
                      href="https://entra.drift.help"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#6f6f6f'
                      }}
                    >
                      <MenuItem className={classes.menu} onClick={handleClose}>
                        Help
                      </MenuItem>
                    </a>

                    <MenuItem className={classes.menu}>
                      <Signout />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
