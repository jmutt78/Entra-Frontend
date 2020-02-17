import React from 'react';
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

const Header = ({ classes, router, me }) => {
  return <NavBar isLoggedIn={!!me} me={me} router={router} />;
};

export default withRouter(Header);
