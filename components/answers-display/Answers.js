import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import { withApollo } from "react-apollo";
import Link from "next/link";
import { Query } from "react-apollo";
import ApproveAnswer from "../approval/AppoveAnswer.js";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import gql from "graphql-tag";
import Icon from "../ui/Icon";
import questionQuery from "../question-display/questionQuery";

import { CURRENT_USER_QUERY } from "../auth/User";

const CREATE_ANSWER_VOTE_MUTATION = gql`
  mutation CREATE_ANSWER_VOTE_MUTATION($answerId: ID!, $vote: String) {
    createAnswerVote(answerId: $answerId, vote: $vote) {
      id
    }
  }
`;

const styles = theme => ({
  bigAvatar: {
    width: 70,
    height: 70
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
  }
});

class Answers extends Component {
  handleImage(askedby, name, classes) {
    if (askedby == null || askedby == "") {
      return (
        <div>
          <Avatar className={classes.bigAvatar}>{name[0]}</Avatar>
        </div>
      );
    }

    return (
      <div>
        <Avatar alt="Remy Sharp" src={askedby} className={classes.bigAvatar} />
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

  handleEdit(answer, user) {
    if (answer.answeredBy.id == user.id) {
      return (
        <Typography>
          <Link
            href={{
              pathname: "/edit-answer",
              query: { id: answer.id }
            }}
          >
            <a style={{ textDecoration: "none", color: "grey" }}>EDIT</a>
          </Link>
        </Typography>
      );
    }
  }

  upVote = answerId => {
    this.props.client.mutate({
      mutation: CREATE_ANSWER_VOTE_MUTATION,
      variables: {
        answerId,
        vote: "up"
      },
      refetchQueries: [
        { query: questionQuery, variables: { id: this.props.id } }
      ]
    });
  };
  downVote = answerId => {
    this.props.client.mutate({
      mutation: CREATE_ANSWER_VOTE_MUTATION,
      variables: {
        answerId,
        vote: "down"
      },
      refetchQueries: [
        { query: questionQuery, variables: { id: this.props.id } }
      ]
    });
  };

  render() {
    const { classes } = this.props;
    const answers = this.props.question.answers;
    if (this.props.question.answers.length === 0) {
      return <div />;
    } else {
      return (
        <Query query={CURRENT_USER_QUERY}>
          {({ data, loading }) => {
            if (loading) return <p>Loading...</p>;
            const user = data.me;

            return (
              <div>
                <Grid container className={classes.root} spacing={3}>
                  <Grid item xs />
                  <Grid item xs={7} className={classes.grid}>
                    {this.handleTitle(answers)}
                    {answers.map(answer => {
                      const answeredBy = answer.answeredBy.id;
                      const ownsAnswer = answeredBy === user.id;
                      const isApproved = answer.approval === true;
                      const questionId = answer.answeredTo[0].id;

                      const hasPermissions = user.permissions.some(permission =>
                        ["ADMIN", "MODERATOR"].includes(permission)
                      );

                      if (!ownsAnswer && !hasPermissions && !isApproved) {
                        return <div />;
                      }
                      return (
                        <div key={answer.id} className={classes.info}>
                          <div className={classes.photoTitle}>
                            {this.handleImage(
                              answer.answeredBy.image,
                              answer.answeredBy.display,
                              classes
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
                              <Icon
                                onClick={() => this.upVote(answer.id)}
                                src="/static/thumb_up.svg"
                              />
                              <div>{answer.upVotes}</div>
                            </Grid>
                            <Grid item xs={4}>
                              <Icon
                                onClick={() => this.downVote(answer.id)}
                                src="/static/thumb_down.svg"
                              />
                              <div>{answer.downVotes}</div>
                            </Grid>
                          </Grid>
                          <Typography className={classes.date}>
                            Posted{" "}
                            {format(
                              parseISO(answer.createdAt),
                              "MMMM dd, yyyy"
                            )}
                          </Typography>
                          {this.handleEdit(answer, user)}

                          <ApproveAnswer
                            hasPermissions={hasPermissions}
                            isApproved={isApproved}
                            approval={answer.approval}
                            id={answer.id}
                            questionId={questionId}
                          />
                        </div>
                      );
                    })}
                  </Grid>
                  <Grid item xs />
                </Grid>
              </div>
            );
          }}
        </Query>
      );
    }
  }
}

Answers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withApollo(Answers));
