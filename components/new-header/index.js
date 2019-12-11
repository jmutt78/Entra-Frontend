import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';

import NProgress from 'nprogress';

import NavBar from './NavBar';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from '../auth/User';

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

const Header = ({ classes, router }) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data: { me } }) => (
        <div className={classes.root}>
          <NavBar isLoggedIn={!!me} me={me} router={router} />
        </div>
      )}
    </Query>
  );
};

export default withStyles(styles)(Header);
