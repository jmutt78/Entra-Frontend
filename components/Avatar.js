import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { withRouter } from 'next/router';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';
import { Mixpanel } from '../utils/Mixpanel';

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
  },
  arrow: {
    border: 'solid #85bdcb',
    borderWidth: '0 3px 3px 0',
    display: 'inline-block',
    padding: '4px',
    marginLeft: '10px',
    transform: 'rotate(45deg)',
    webkitTransform: 'rotate(45deg)'
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
                <i className={classes.arrow} />
              </div>
            )}
          </Typography>
        </div>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link href="/account/myaccount">
            <MenuItem onClick={this.handleClose}>My Profile</MenuItem>
          </Link>
          <Link href="/account/editaccount">
            <MenuItem onClick={this.handleClose}>Edit Account</MenuItem>
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
