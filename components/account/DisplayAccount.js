import React, { Component } from "react";
import { Query } from "react-apollo";
import QaDisplay from "./QaDisplay";
import MainInfoDisplay from "./MainInfoDisplay";
import BadgesDisplay from "./BadgesDisplay";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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

          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={12}>
                <MainInfoDisplay user={user} />
              </Grid>
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={9} className={classes.grid}>
                <QaDisplay user={user} />
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <BadgesDisplay user={user} />
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
