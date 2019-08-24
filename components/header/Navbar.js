import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import NavLink from "./NavLink";

import Avatar from "./Avatar";
import User from "../auth/User.js";

import "./Navbar.css";

const styles = ({ layout, palette }) => ({
  appbar: {
    background: "#85BDCB",
    boxShadow: "none"
  },
  navText: {
    color: "white",
    marginLeft: "2rem",
    position: "relative",
    zIndex: 2,
    textDecoration: "none",
    fontSize: 20,
    fontWieght: "strong"
  },

  // own
  container: {
    width: '100%', //layout.width,
    height: 80, //layout.navHeight,
    display: "flex",
    alignItems: "center"
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    padding: "5px 35px 0 0",

    color: "white",
    fontSize: "1.1rem"
  },
  navigationContainer: {
    height: 80, //layout.navHeight,
    display: "flex",
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    padding: "0 0 0 20px"
  },
  navLink: {
    fontSize: "1.2rem",
    color: palette.secondary.light,
    padding: "12px 10px 8px 10px",
    textDecoration: "none",
    "&:hover": {
      color: palette.primary.dark
    }
  },
  navLinkActive: {
    height: 80, //layout.navHeight,
    display: "flex",
    alignItems: "center",
    color: palette.primary.main,
    background: palette.secondary.main,
    fontWeight: 500
  }
});

const Navbar = ({ classes }) => {
  const navLinks = [
    {
      name: "My Questions",
      target: "/myquestions"
    },
    {
      name: "My Answers",
      target: "/myanswers"
    },
    {
      name: "My Bookmarks",
      target: "/mybookmarks"
    }
  ];

  const adminLinks = [
    {
      name: "Approve Questions",
      target: "/approval/question-list"
    },
    {
      name: "Approve Answers",
      target: "/approval/answer-list"
    }
  ];

  return (
    <div className="style-target" style={{ width: "100%" }}>
      <User>
        {({ data: { me } }) => (
          <AppBar className={classes.appbar} position="static">
            <div className={classes.container}>
              <Typography className={classes.navigationContainer}>
                {me &&
                  me.permissions.some(permission =>
                    ["ADMIN", "MODERATOR"].includes(permission)
                  ) &&
                  adminLinks.map(({ name, target }) => (
                    <NavLink
                      activeClassName={classes.navLinkActive}
                      href={target}
                      key={name}
                    >
                      <a className={classes.navLink}>{name}</a>
                    </NavLink>
                  ))}

                {navLinks.map(({ name, target }) => (
                  <NavLink
                    activeClassName={classes.navLinkActive}
                    href={target}
                    key={name}
                  >
                    <a className={classes.navLink}>{name}</a>
                  </NavLink>
                ))}
              </Typography>
              <Avatar me={me} />
              {me && (
                <Typography className={classes.avatarContainer}>
                  {me.name}
                </Typography>
              )}
            </div>
          </AppBar>
        )}
      </User>
    </div>
  );
};

export default withStyles(styles)(Navbar);
