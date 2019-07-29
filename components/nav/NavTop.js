import React, { Component } from "react";
import User from "../auth/User.js";
import MyProfile from "./MyProfile.js";
import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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
  }
};

class NavTop extends Component {
  handleApproval(me, classes) {
    const hasPermissions = me.permissions.some(permission =>
      ["ADMIN", "MODERATOR"].includes(permission)
    );

    if (!hasPermissions) {
      return <div />;
    }
    return (
      <Toolbar>
        <Typography>
          <Link href="/approval/question-list">
            <a className={classes.navText}>Approve Questions</a>
          </Link>
        </Typography>

        <Typography>
          <Link href="/approval/answer-list">
            <a className={classes.navText}>Approve Answers</a>
          </Link>
        </Typography>
      </Toolbar>
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
                      <MyProfile me={me} />
                      <Typography variant="h5" className={classes.text}>
                        <p>{me.name}</p>
                      </Typography>
                      {this.handleApproval(me, classes)}
                      <Typography>
                        <Link href="/myquestions">
                          <a className={classes.navText}>My Questions</a>
                        </Link>
                      </Typography>
                      <Typography>
                        <Link href="/myanswers">
                          <a className={classes.navText}>My Answers</a>
                        </Link>
                      </Typography>
                      <Typography>
                        <Link href="/">
                          <a className={classes.navText}>My Bookmark</a>
                        </Link>
                      </Typography>
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

export default withStyles(styles)(NavTop);
