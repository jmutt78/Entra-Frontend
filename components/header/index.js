import React from "react";
import { withStyles } from "@material-ui/core/styles";

import NProgress from "nprogress";

import Navbar from "./Navbar";
import Appbar from "./Appbar";

import Router from "next/router";
import User from "../auth/User.js";

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
      minWidth: layout.width,
      width: "100%"
    }
  };
};

const Header = ({ classes }) => {
  return (
    <User>
      {({ data: { me } }) => (
        <div className={classes.root}>
          {me && <Navbar />}
          <Appbar isLoggedIn={!!me} />
        </div>
      )}
    </User>
  );
};

export default withStyles(styles)(Header);
