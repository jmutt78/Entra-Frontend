import React, { Component } from "react";
import Link from "next/link";
import { Query } from "react-apollo";

import Error from "./../ErrorMessage.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { PAGINATION_QUERY } from "../pagination/paginationQuery.js";

const styles = ({ spacing, palette }) => ({
  root: {
    marginBottom: spacing.unit,
    marginTop: 40
  },
  container: {
    width: "100%",
    padding: "20px 0"
  },
  qaGrid: {
    marginLeft: spacing.unit * 9,
    marginRight: spacing.unit * 9,
    padding: "30px"
  },
  grid: {
    marginBottom: spacing(4),
    marginLeft: spacing(2)
  },
  link: {
    textDecoration: "none",
    color: "grey"
  },
  title: {
    color: palette.accent.dark,
    padding: "5px 0 0 20px",
    margin: 0,
    marginTop: 30,
    marginBottom: 30,
    maxWidth: 800,
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: "2.5rem"
  }
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
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          const user = this.props.user;
          const answers = user.myAnswers;
          const userId = user.id;

          const questions = user.myQuestions;

          return (
            <div className={classes.container}>
              <Typography variant="h3" className={classes.title}>
                Activity
              </Typography>

              <Grid container className={classes.root} spacing={16}>
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
                  <Typography
                    variant="h5"
                    align="center"
                    className={classes.link}
                  >
                    Points
                  </Typography>
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(QaDisplay);
