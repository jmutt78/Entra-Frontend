import React, { Component } from "react";
import PropTypes from "prop-types";
import User from "../auth/User.js";
import Signout from "../auth/Signout";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  top: {
    backgroundColor: "#85BDCB",
    boxShadow: "none"
  },
  grow: {
    flexGrow: 1
  },
  text: {
    flexGrow: 100,
    color: "white",
    fontSize: 16
  },
  navText: {
    color: "white",
    fontSize: "1.5rem",
    marginLeft: "2rem",
    position: "relative",
    zIndex: 2,
    textDecoration: "none",
    fontSize: 20,
    fontWieght: "strong"
  },

  bigAvatar: {
    margin: 10,
    width: 40,
    height: 40
  }
};

class NavTop extends Component {
  handleImage(me, classes) {
    if (me.image == null || me.image == "") {
      return (
        <div>
          <Avatar className={classes.bigAvatar}>{me.name[0]}</Avatar>
        </div>
      );
    }
    return (
      <div>
        <Avatar alt="Remy Sharp" src={me.image} className={classes.bigAvatar} />
      </div>
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <User>
        {({ data: { me } }) => (
          <div>
            {me && (
              <>
                <div>
                  <AppBar className={classes.top} position="static">
                    <Toolbar>
                      <Typography variant="h5" className={classes.grow}>
                        {this.handleImage(me, classes)}
                      </Typography>
                      <Typography variant="h5" className={classes.text}>
                        <p>{me.name}</p>
                      </Typography>
                      <Typography>
                        <Link href="/myquestions">
                          <a className={classes.navText}>My Questions</a>
                        </Link>
                      </Typography>
                      <Typography>
                        <Link href="/">
                          <a className={classes.navText}>My Bookmark</a>
                        </Link>
                      </Typography>
                      <Typography>
                        <Link href="/account/myaccount">
                          <a className={classes.navText}>My Profile</a>
                        </Link>
                      </Typography>
                      <Signout />
                    </Toolbar>
                  </AppBar>
                </div>
              </>
            )}
            {!me && <></>}
          </div>
        )}
      </User>
    );
  }
}

NavTop.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavTop);
