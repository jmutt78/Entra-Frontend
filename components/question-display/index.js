import React, { Component } from "react";
import { Query } from "react-apollo";
import { format, parseISO } from "date-fns";
import MainQuestion from "./MainQuestion.js";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import Error from "../ErrorMessage";
import styled from "styled-components";
import Head from "next/head";

import { CURRENT_USER_QUERY } from "../auth/User";

const SINGLE_QUESTION_QUERY = gql`
  query SINGLE_QUESTION_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      askedBy {
        id
        display
        image
      }
      createdAt
      answers {
        id
        body
      }
      tags {
        id
        name
      }
    }
  }
`;

const styles = theme => ({
  grid: {
    margin: theme.spacing.unit
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  }
});

class DisplayQuestion extends Component {
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
                <MainQuestion />
              </Grid>
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={9} className={classes.grid}>
                Hold for Answer Display
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                Hold for Answer
              </Grid>
              <Grid item xs={2} className={classes.grid} />
            </Grid>
          );
        }}
      </Query>
    );
  }
}

DisplayQuestion.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DisplayQuestion);
