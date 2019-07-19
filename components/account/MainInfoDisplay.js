import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import { Query } from "react-apollo";
import Link from "next/link";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

import { CURRENT_USER_QUERY } from "../auth/User";

const styles = theme => ({
  bigAvatar: {
    width: 120,
    height: 120
  },
  grid: {
    margin: theme.spacing.unit
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  },
  divider: {
    marginTop: theme.spacing.unit * 5
  },
  about: {
    fontSize: 17,
    color: "grey"
  }
});

class MainInfoDisplay extends Component {
  handleImage(user, classes) {
    if (user.image == null || user.image == "") {
      return (
        <div>
          <Avatar className={classes.bigAvatar}>{user.name[0]}</Avatar>
        </div>
      );
    }
    return (
      <div>
        <Avatar
          alt="Remy Sharp"
          src={user.image}
          className={classes.bigAvatar}
        />
      </div>
    );
  }

  handleEdit(me, user, classes) {
    if (me.id === user.id) {
      return (
        <div>
          <Typography>
            <Link href="/account/editaccount">
              <a style={{ textDecoration: "none", color: "grey" }}>
                EDIT ACCOUNT INFO
              </a>
            </Link>
          </Typography>
        </div>
      );
    }
    return <div />;
  }

  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          const { classes } = this.props;

          const user = this.props.user;
          const me = data.me;

          const dateToFormat = this.props.user.createdAt;
          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={1} className={classes.grid}>
                {this.handleImage(user, classes)}
              </Grid>
              <Grid item xs={4} className={classes.grid}>
                <Typography variant="h4">{user.name}</Typography>
                <Typography variant="h6">{user.display}</Typography>
                <Typography variant="subheading">
                  Location: {user.location}
                </Typography>
                <Typography variant="subheading">
                  Industry: {user.industry}
                </Typography>
                <Typography>
                  Member Since {format(parseISO(dateToFormat), "MMMM dd, yyyy")}
                </Typography>
              </Grid>
              <Grid item className={classes.grid} />
              <Grid item className={classes.grid}>
                {this.handleEdit(me, user, classes)}
              </Grid>
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={7} className={classes.grid}>
                <Typography className={classes.about}>{user.about}</Typography>
                <Divider className={classes.divider} variant="middle" />
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(MainInfoDisplay);
