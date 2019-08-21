import React, { Component } from "react";
import { Query } from "react-apollo";

import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import BadgesDisplay from "./BadgesDisplay";
import MainInfoDisplay from "./MainInfoDisplay";
import QaDisplay from "./QaDisplay";
import Error from "./../ErrorMessage.js";

import { CURRENT_USER_QUERY } from "../auth/User";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center"
  },
  title: {
    fontSize: "40px",
    textAlign: "Left",
    color: "rgba(0, 0, 0, 0.87)"
  },
  link: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87)"
  },
  icon: {
    color: "black"
  }
});

class DisplayAccount extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;

          const user = data.me;

          return (
            <Grid container className={classes.container}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="display3" className={classes.title}>
                        {`${user.name}'s Profile`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <MainInfoDisplay user={user} />
              <QaDisplay user={user} />
              <BadgesDisplay user={user} />
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(DisplayAccount);
