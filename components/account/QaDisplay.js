import React, { Component } from "react";
import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  grid: {
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(2)
  },
  root: {
    marginBottom: theme.spacing(1),
    marginTop: 40
  },
  qaGrid: {
    marginLeft: theme.spacing(9),
    marginRight: theme.spacing(9)
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
    const { classes, user } = this.props;
    const answers = user.myAnswers;
    const userId = user.id;
    const questions = user.myQuestions;
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
            <Link
              href={{
                pathname: "/users",
                query: { id: userId }
              }}
            >
              <a className={classes.link}>Questions</a>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.qaGrid}>
          <Typography variant="h4" align="center">
            {user.myAnswers.length}
          </Typography>
          <Typography variant="h5" align="center">
            <Link
              href={{
                pathname: "/answers",
                query: { id: userId }
              }}
            >
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
            <Link
              href={{
                pathname: "/selected",
                query: { id: userId }
              }}
            >
              <a className={classes.link}>Accepted Answers</a>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.qaGrid}>
          <Typography variant="h4" align="center">
            {this.handlePointCount(questions, answers)}
          </Typography>
          <Typography variant="h5" align="center" className={classes.link}>
            Points
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(QaDisplay);
