import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import { withApollo } from "react-apollo";
import Link from "next/link";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import gql from "graphql-tag";
import Icon from "../ui/Icon";

const styles = theme => ({
  bigAvatar: {
    width: 70,
    height: 70,
    cursor: "pointer"
  },
  grid: {
    margin: theme.spacing.unit
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  },
  title: {
    marginBottom: 20,
    fontSize: 20
  },
  photoTitle: {
    display: "inline-flex",
    marginRight: 10,
    marginBottom: 20
  },
  paper: {
    backgroundColor: "#F2F4EF",
    padding: 30
  },
  tags: {
    display: "inline-flex",
    marginRight: 10,
    marginTop: 20
  },
  date: {
    marginTop: 20
  },
  description: {
    fontSize: 17
  },
  info: {
    marginBottom: 30,
    marginTop: 30
  },
  buttonTop: {
    backgroundColor: "#E27D60",
    marginLeft: theme.spacing.unit * 2
  }
});

class NoUserAnswers extends Component {
  handleImage(askedby, name, classes, answeredBy) {
    if (askedby == null || askedby == "") {
      return (
        <div>
          <Link
            href={{
              pathname: "/user",
              query: { id: answeredBy }
            }}
          >
            <Avatar className={classes.bigAvatar}>{name[0]}</Avatar>
          </Link>
        </div>
      );
    }

    return (
      <div>
        <Link
          href={{
            pathname: "/user",
            query: { id: answeredBy }
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={askedby}
            className={classes.bigAvatar}
          />
        </Link>
      </div>
    );
  }

  handleTitle(answers) {
    if (answers == null || answers == "") {
      return <div />;
    }

    return (
      <div>
        <Typography variant="display2">Answers</Typography>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const answers = this.props.question.answers;

    const questionId = this.props.question.id;
    if (this.props.question.answers.length === 0) {
      return <div />;
    } else {
      return (
        <div>
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs />
            <Grid item xs={7} className={classes.grid}>
              {this.handleTitle(answers)}
              {answers.map(answer => {
                const answeredBy = answer.answeredBy.id;
                const isApproved = answer.approval === true;
                const questionId = answer.answeredTo[0].id;

                if (!isApproved) {
                  return <div />;
                }
                return (
                  <div key={answer.id} className={classes.info}>
                    <div className={classes.photoTitle}>
                      {this.handleImage(
                        answer.answeredBy.image,
                        answer.answeredBy.display,
                        classes,
                        answeredBy
                      )}
                      <Typography
                        style={{
                          paddingTop: 20,
                          marginLeft: 10
                        }}
                      >
                        <strong>{answer.answeredBy.display}</strong> says:
                      </Typography>
                    </div>
                    <Typography className={classes.description}>
                      {answer.body}
                    </Typography>
                    <Grid item xs={2} container>
                      <Grid item xs={4}>
                        <Icon src="/static/thumb_up.svg" />
                        <div>{answer.upVotes}</div>
                      </Grid>
                      <Grid item xs={4}>
                        <Icon src="/static/thumb_down.svg" />
                        <div>{answer.downVotes}</div>
                      </Grid>
                    </Grid>
                    <Typography className={classes.date}>
                      Posted{" "}
                      {format(parseISO(answer.createdAt), "MMMM dd, yyyy")}
                    </Typography>
                  </div>
                );
              })}
            </Grid>
            <Grid item xs />
          </Grid>
        </div>
      );
    }
  }
}

export default withStyles(styles)(withApollo(NoUserAnswers));
