import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { withRouter } from 'next/router';

import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import Signout from './auth/Signout';

const styles = {
  bigAvatar: {
    margin: 15,
    width: 50,
    height: 50,
    cursor: 'pointer'
  },
  smallAvatar: {
    margin: 5,
    width: 25,
    height: 25,
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
          onClick={this.handleClick}
        >
          {this.handleImage(me, classes)}
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
