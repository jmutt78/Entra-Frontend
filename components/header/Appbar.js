import React from "react";

import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import User from "../auth/User.js";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import NavLink from "./NavLink";

const styles = ({ layout, palette }) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F2F4EF",
    boxShadow:
      "0px 2px 4px -4px rgba(0,0,0,0.2), 0px 4px 5px -5px rgba(0,0,0,0.14), 0px 1px 10px -10px rgba(0,0,0,0.12)",
    height: layout.headerHeight
  },
  flexContainer: {
    width: layout.width,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  // TODO do this in plain css
  flexContainerMedia: {
    flexDirection: "column"
  },
  subContainer: {
    display: "flex",
    height: layout.headerHeight,
    alignItems: "center"
  },
  button: {
    margin: 12
  },
  signupButton: {
    backgroundColor: palette.primary.dark,
    "&:hover": {
      backgroundColor: palette.primary.main
    }
  },
  loginButton: {
    backgroundColor: palette.accent.grey,
    "&:hover": {
      backgroundColor: palette.primary.main
    }
  },
  logo: {
    marginTop: "1rem",
    marginLeft: 5,
    maxHeight: "60px",
    maxWidth: "170px",
    width: "170px",
    height: "60px"
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    color: palette.accent.dark,
    fontSize: "1.2rem",
    padding: "12px 10px 8px 10px",
    textDecoration: "none",
    "&:hover": {
      color: palette.primary.dark
    }
  },
  navLinkActive: {
    alignItems: "center",
    color: palette.primary.dark,
    display: "flex",
    fontSize: "1.2rem",
    fontWeight: 500,
    height: layout.headerHeight,
    padding: "12px 10px 8px 10px"
  },
  invisible: {
    visibility: "hidden"
  }
});

const Appbar = ({ isLoggedIn, classes }) => {
  const navLinks = [
    {
      name: "Ask a question",
      target: isLoggedIn ? "/qa" : "/signup"
    },
    {
      name: "Blog",
      target: "/blogs"
    }
  ];

  return (
    <MaterialAppBar position="static" className={classes.root}>
      <Toolbar>
        <div className={classes.flexContainer}>
          <div className={classes.subContainer}>
            <Typography variant="h6">
              <Link href="/">
                <a>
                  {
                    <img
                      className={classes.logo}
                      src="static/Screen Shot 2019-05-07 at 10.37.21 AM.jpg"
                    />
                  }
                </a>
              </Link>
            </Typography>
          </div>

          <Typography>
            <div className={classes.subContainer}>
              {navLinks.map(({ name, target }) => (
                <NavLink activeClassName={classes.navLinkActive} href={target}>
                  <a className={classes.navLink}>{name}</a>
                </NavLink>
              ))}
            </div>
          </Typography>

          <User>
            {({ data: { me } }) => {
              if (!me) {
                return (
                  <Typography
                    className={
                      me
                        ? classes.subContainer
                        : [classes.subContainer, classes.invisible]
                    }
                  >
                    <Link href="/signin">
                      <Button
                        variant="contained"
                        color="secondary"
                        className={[classes.button, classes.loginButton]}
                      >
                        Login
                      </Button>
                    </Link>

                    <Link href="/signup">
                      <Button
                        variant="contained"
                        color="secondary"
                        className={[classes.button, classes.signupButton]}
                      >
                        Sign up
                      </Button>
                    </Link>
                  </Typography>
                );
              }
              return null;
            }}
          </User>
        </div>
      </Toolbar>
    </MaterialAppBar>
  );
};

export default withStyles(styles)(Appbar);
