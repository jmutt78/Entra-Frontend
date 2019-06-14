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

const SINGLE_QUESTION_QUERY = gql`
  query SINGLE_QUESTION_QUERY($id: ID!) {
    question(where: { id: $id }) {
      id
      title
      description
      askedBy {
        id
        display
        image
        name
      }
      createdAt
      answers {
        id
        body
        createdAt
        answeredBy: answeredBy {
          id
          display
          image
          createdAt
        }
      }
      tags {
        id
        name
      }
    }
  }
`;

const CREATE_QUESTION_VIEW_MUTATION = gql`
  mutation CREATE_QUESTION_VIEW_MUTATION($questionId: ID!) {
    createQuestionView(questionId: $questionId)
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
      <Query
        query={SINGLE_QUESTION_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data: { question }, loading }) => {
          if (loading) return <p>Loading...</p>;
          return (
            <Mutation
              mutation={CREATE_QUESTION_VIEW_MUTATION}
              variables={{
                questionId: this.props.id
              }}
            >
              {(createQuestionView, { error, loading }) => {
                return (
                  <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12} className={classes.grid}>
                      <MainQuestion
                        id={this.props.id}
                        question={question}
                        createQuestionView={createQuestionView}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.grid}>
                      <Answers id={this.props.id} question={question} />
                    </Grid>
                    <Grid item xs={12} className={classes.grid}>
                      <CreateAnswer id={this.props.id} />
                    </Grid>
                  </Grid>
                );
              }}
            </Mutation>
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
