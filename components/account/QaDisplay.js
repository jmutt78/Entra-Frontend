import React, { Component } from "react";
import Link from "next/link";
import { Query } from "react-apollo";
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
  handlePointCount(questions, answers) {
    const allQuestions = questions.map(data => data.questionVote);
    const flatQuestionVotes = allQuestions.reduce(
      (acc, vote) => [...acc, ...vote],
      []
    );
    const questionVotes = flatQuestionVotes.map(data => data.vote);
    const questionCount = questionVotes.reduce((n, x) => n + (x === "up"), 0);

    const allAnswers = answers.map(data => data.answerVote);
    const flatVotes = allAnswers.reduce((acc, vote) => [...acc, ...vote], []);
    const answerVote = flatVotes.map(data => data.vote);
    const answerCount = answerVote.reduce((n, x) => n + (x === "up"), 0);
    const count = answerCount + questionCount;
    return count;
  }
  render() {
    const { classes } = this.props;

    return (
      <Query
        query={PAGINATION_QUERY}
        variables={{
          filter: "my"
        }}
        fetchPolicy="network-only"
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          const user = this.props.user;
          const answers = user.myAnswers;

          const questions = user.myQuestions;
          // //const question = data.questionsConnection.aggregate.count;
          // //console.log(data.questionsConnection.aggregate);

          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={8} className={classes.grid}>
                <Typography variant="h4">Activity</Typography>
              </Grid>

              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={1} className={classes.qaGrid}>
                <Typography variant="h4" align="center">
                  {user.myQuestions.length}
                </Typography>
                <Typography variant="h5" align="center">
                  <Link href="/myquestions">
                    <a className={classes.link}>Questions</a>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.qaGrid}>
                <Typography variant="h4" align="center">
                  {user.myAnswers.length}
                </Typography>
                <Typography variant="h5" align="center">
                  <Link href="/myanswers">
                    <a className={classes.link}>Answers</a>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.qaGrid}>
                <Typography variant="h4" align="center">
                  {
                    answers.filter((x, i) => {
                      return x.selected;
                    }).length
                  }
                </Typography>
                <Typography variant="h5" align="center">
                  <Link href="/">
                    <a className={classes.link}>Accepted Answers</a>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.qaGrid}>
                <Typography variant="h4" align="center">
                  {this.handlePointCount(questions, answers)}
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

export default withStyles(styles)(QaDisplay);
