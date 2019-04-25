import React, { Component } from "react";
import { Query } from "react-apollo";
import { format, parseISO } from "date-fns";
import QaDisplay from "./QaDisplay";
import MainInfoDisplay from "./MainInfoDisplay";
import BadgesDisplay from "./BadgesDisplay";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { CURRENT_USER_QUERY } from "../auth/User";

const styles = theme => ({
  grid: {
    margin: theme.spacing.unit
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  }
});

class DisplayAccount extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          const user = data.me;
          const dateToFormat = data.me.createdAt;
          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={12}>
                <MainInfoDisplay data={data} />
              </Grid>
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={9} className={classes.grid}>
                <QaDisplay data={data} />
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <BadgesDisplay data={data} />
              </Grid>
              <Grid item xs={2} className={classes.grid} />
            </Grid>
          );
        }}
      </Query>
    );
  }
}

DisplayAccount.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DisplayAccount);
