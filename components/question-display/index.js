import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { format, parseISO } from "date-fns";
import MainQuestion from "./MainQuestion.js";
import CreateAnswer from "../create-answer";
import Answers from "../answers-display/Answers.js";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import Error from "../ErrorMessage";
import styled from "styled-components";
import Head from "next/head";
import questionQuery from "./questionQuery";

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
      <Query
        query={questionQuery}
        variables={{
          id: this.props.id
        }}
      >
        {({ data: { question }, loading }) => {
          if (loading) return <p>Loading...</p>;
          console.log(this.props);
          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={12} className={classes.grid}>
                <MainQuestion id={this.props.id} question={question} />
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <Answers id={this.props.id} question={question} />
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <CreateAnswer question={question} />
              </Grid>
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
