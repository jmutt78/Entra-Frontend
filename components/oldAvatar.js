import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { withRouter } from 'next/router';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import { withStyles } from '@material-ui/core/styles';
import Signout from './auth/Signout';

const styles = {
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
};

class MyProfile extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    if (this.props.linkToId) {
      this.props.router.push({
        pathname: '/user',
        query: { id: this.props.linkToId }
      });
    } else {
      this.setState({ anchorEl: event.currentTarget });
    }
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleImage(me, classes) {
    if (!me) {
      return null;
    }
    if (me.image == null || me.image == '') {
      return (
        <Avatar
          className={this.props.small ? classes.smallAvatar : classes.bigAvatar}
        >
          {me.name[0]}
        </Avatar>
      );
    }
    return (
      <Avatar alt="Remy Sharp" src={me.image} className={classes.bigAvatar} />
    );
  }

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const me = this.props.me;

    return (
      <div>
        <div
          className={classNames(classes.grow, 'nav-avatar')}
          onClick={this.props.small ? null : this.handleClick}
        >
          <Typography
            className={this.props.small ? null : classes.avatarContainer}
            component={'div'}
          >
            {this.handleImage(me, classes)}
            {this.props.small ? null : (
              <div>
                {me.name}
                <ArrowDropDownIcon />
              </div>
            )}
          </Typography>
        </div>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          aria-controls={anchorEl ? 'menu-list-grow' : undefined}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link href="/account/myaccount">
            <MenuItem onClick={this.handleClose}>My Profile</MenuItem>
          </Link>
          <Divider />
          <Link href="/myquestions">
            <MenuItem onClick={this.handleClose}>My Questions</MenuItem>
          </Link>
          <Link href="/myanswers">
            <MenuItem onClick={this.handleClose}>My Answers</MenuItem>
          </Link>
          <Link href="/mybookmarks">
            <MenuItem onClick={this.handleClose}>Bookmarks</MenuItem>
          </Link>
          <Divider />
          <Link href="https://entra.drift.help">
            <a
              href="https://entra.drift.help"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <MenuItem onClick={this.handleClose}>Help</MenuItem>
            </a>
          </Link>

          <MenuItem>
            <Signout />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(MyProfile));
