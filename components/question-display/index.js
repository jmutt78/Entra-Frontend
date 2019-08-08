import React, { Component } from "react";
import { Query } from "react-apollo";
import MainQuestion from "./MainQuestion.js";
import CreateAnswer from "../create-answer";
import Answers from "../answers-display/Answers.js";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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
          if (!question) {
            return <p>Question not found</p>;
          }
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

export default withStyles(styles)(DisplayQuestion);
