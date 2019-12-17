import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';
import NProgress from 'nprogress';

import NavBar from './NavBar';
import Router from 'next/router';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const styles = ({ layout }) => {
  return {
    root: {
      minWidth: '100%', //layout.width,
      width: '100%'
    }
  };
};

const Header = ({ classes, router, me }) => {
  return (
    <div className={classes.root}>
      <NavBar isLoggedIn={!!me} me={me} router={router} />
    </div>
  );
};

export default withRouter(withStyles(styles)(Header));
