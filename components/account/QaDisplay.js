import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import Pagination from "../pagination";
import { Query } from "react-apollo";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { PAGINATION_QUERY } from "../pagination/";

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
    console.log(this.props.data.me.id);
    return (
      <Query
        query={PAGINATION_QUERY}
        variables={{
          id: "5cc2033924aa9a000712bb1e"
        }}
        fetchPolicy="network-only"
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          const user = this.props.data.me;
          //const question = data.questionsConnection.aggregate.count;
          //console.log(data.questionsConnection.aggregate);
          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={8} className={classes.grid}>
                <Typography variant="h4">Activity</Typography>
              </Grid>
              <Grid className={classes.linkGrid}>
                <Typography>
                  <Link href="/myquestions">
                    <a className={classes.link}>VIEW ALL</a>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={1} className={classes.qaGrid}>
                <Typography variant="h4" align="center">
                  0
                </Typography>
                <Typography variant="h5" align="center">
                  <Link href="/myquestions">
                    <a className={classes.link}>Questions</a>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.qaGrid}>
                <Typography variant="h4" align="center">
                  0
                </Typography>
                <Typography variant="h5" align="center">
                  <Link href="/myanswers">
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
                    <a className={classes.link}>Points</a>
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

QaDisplay.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QaDisplay);
