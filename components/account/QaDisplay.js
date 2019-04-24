import React, { Component } from "react";
import { Query } from "react-apollo";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { CURRENT_USER_QUERY } from "../auth/User";

const styles = theme => ({
  grid: {
    margin: theme.spacing.unit
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  },
  qaGrid: {
    marginLeft: 50,
    marginRight: 50
  }
});

class QaDisplay extends Component {
  render() {
    const { classes } = this.props;
    const user = data.me;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={6} className={classes.grid}>
          <Typography variant="h4">Q&A Activity</Typography>
        </Grid>
        <Grid item xs={2} className={classes.grid}>
          <Typography>
            <Link href="/">
              <a style={{ textDecoration: "none", color: "grey" }}>VIEW ALL</a>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.grid} />
        <Grid item xs={1} className={classes.qaGrid}>
          <Typography variant="h4" align="center">
            8
          </Typography>
          <Typography variant="h5" align="center">
            <Link href="/">
              <a style={{ textDecoration: "none", color: "grey" }}>Questions</a>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.qaGrid}>
          <Typography variant="h4" align="center">
            13
          </Typography>
          <Typography variant="h5" align="center">
            <Link href="/">
              <a style={{ textDecoration: "none", color: "grey" }}>Answers</a>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.qaGrid}>
          <Typography variant="h4" align="center">
            0
          </Typography>
          <Typography variant="h5" align="center">
            <Link href="/">
              <a style={{ textDecoration: "none", color: "grey" }}>
                Accepted Answers
              </a>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.qaGrid}>
          <Typography variant="h4" align="center">
            2
          </Typography>
          <Typography variant="h5" align="center">
            <Link href="/">
              <a style={{ textDecoration: "none", color: "grey" }}>Badges</a>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

QaDisplay.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QaDisplay);
