import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  grid: {
    marginBottom: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 2
  },
  root: {
    marginBottom: theme.spacing.unit,
    marginTop: 40
  },
  qaGrid: {
    marginLeft: theme.spacing.unit * 9,
    marginRight: theme.spacing.unit * 9
  },
  link: {
    textDecoration: "none",
    color: "grey"
  },
  linkGrid: {}
});

class QaDisplay extends Component {
  render() {
    const { classes } = this.props;
    const user = this.props.data.me;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={8} className={classes.grid}>
          <Typography variant="h4">Q&A Activity</Typography>
        </Grid>
        <Grid className={classes.linkGrid}>
          <Typography>
            <Link href="/">
              <a className={classes.link}>VIEW ALL</a>
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
              <a className={classes.link}>Questions</a>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.qaGrid}>
          <Typography variant="h4" align="center">
            13
          </Typography>
          <Typography variant="h5" align="center">
            <Link href="/">
              <a className={classes.link}>Answers</a>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.qaGrid}>
          <Typography variant="h4" align="center">
            0
          </Typography>
          <Typography variant="h5" align="center">
            <Link href="/">
              <a className={classes.link}>Accepted Answers</a>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.qaGrid}>
          <Typography variant="h4" align="center">
            2
          </Typography>
          <Typography variant="h5" align="center">
            <Link href="/">
              <a className={classes.link}>Badges</a>
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
