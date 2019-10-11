import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';

import NProgress from 'nprogress';

import Navbar from './Navbar';
import Appbar from './Appbar';
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

const Header = ({ classes }) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data: { me } }) => (
        <div className={classes.root}>
          {me && <Navbar />}
          <Appbar isLoggedIn={!!me} me={me} />
        </div>
      )}
    </Query>
  );
};

export default withStyles(styles)(Header);
