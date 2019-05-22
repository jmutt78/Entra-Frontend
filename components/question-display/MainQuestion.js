import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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

class MainQuestion extends Component {
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

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={2} className={classes.grid}>
          Hold for
        </Grid>
      </Grid>
    );
  }
}

MainQuestion.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MainQuestion);
