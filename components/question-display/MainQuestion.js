import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import { Query } from "react-apollo";
import Link from "next/link";
import gql from "graphql-tag";
import NoQuestion from "./NoQuestion";
import ApproveQuestion from "../approval/AppoveQuestion.js";

import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withApollo } from "react-apollo";
import questionQuery from "./questionQuery";
import Icon from "../ui/Icon";

import { CURRENT_USER_QUERY } from "../auth/User";

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
    fontSize: 17,
    minHeight: 20
  }
});

const CREATE_QUESTION_VOTE_MUTATION = gql`
  mutation CREATE_QUESTION_VOTE_MUTATION($questionId: ID!, $vote: String) {
    createQuestionVote(questionId: $questionId, vote: $vote)
  }
`;

const CREATE_QUESTION_VIEW_MUTATION = gql`
  mutation CREATE_QUESTION_VIEW_MUTATION($questionId: ID!) {
    createQuestionView(questionId: $questionId)
  }
`;

class MainQuestion extends Component {
  componentDidMount() {
    this.props.client.mutate({
      mutation: CREATE_QUESTION_VIEW_MUTATION,
      variables: {
        questionId: this.props.id
      },
      refetchQueries: [
        { query: questionQuery, variables: { id: this.props.id } }
      ]
    });

    this.props.client.query({
      query: CURRENT_USER_QUERY
    });
  }
  upVote = () => {
    this.props.client.mutate({
      mutation: CREATE_QUESTION_VOTE_MUTATION,
      variables: {
        questionId: this.props.id,
        vote: "up"
      },
      refetchQueries: [
        { query: questionQuery, variables: { id: this.props.id } }
      ]
    });
  };
  downVote = () => {
    this.props.client.mutate({
      mutation: CREATE_QUESTION_VOTE_MUTATION,
      variables: {
        questionId: this.props.id,
        vote: "down"
      },
      refetchQueries: [
        { query: questionQuery, variables: { id: this.props.id } }
      ]
    });
  };
  handleImage(askedby, classes) {
    if (askedby.image == null || askedby.image == "") {
      return (
        <div>
          <Avatar className={classes.bigAvatar}>{askedby.name[0]}</Avatar>
        </div>
      );
    }

    return (
      <div>
        <Avatar
          alt="Remy Sharp"
          src={askedby.image}
          className={classes.bigAvatar}
        />
      </div>
    );
  }

  tagsList(tags, classes) {
    return tags.map(tags => (
      <div key={tags.id} className={classes.tags}>
        <Typography style={{ textTransform: "uppercase" }}>
          <strong>{tags.name} </strong>
        </Typography>
      </div>
    ));
  }

  handleEdit(question, user) {
    if (question.askedBy[0].id == user.id) {
      return (
        <Typography>
          <Link
            href={{
              pathname: "/edit-question",
              query: { id: question.id }
            }}
          >
            <a style={{ textDecoration: "none", color: "grey" }}>EDIT</a>
          </Link>
        </Typography>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const question = this.props.question;
    const askedby = this.props.question.askedBy[0];
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          const user = data.me;
          const hasPermissions = user.permissions.some(permission =>
            ["ADMIN", "MODERATOR"].includes(permission)
          );
          const ownsQuestion = askedby.id === user.id;
          const isApproved = question.approval === true;

          if (!ownsQuestion && !hasPermissions && !isApproved) {
            return <NoQuestion />;
          }
          return (
            <Grid container className={classes.root} spacing={3}>
              <Grid item xs />
              <Grid item xs={7} className={classes.grid}>
                <Paper className={classes.paper}>
                  <Typography className={classes.title} variant="h5">
                    <strong>{question.title}</strong>
                  </Typography>
                  <div className={classes.photoTitle}>
                    {this.handleImage(askedby, classes)}
                    <Typography style={{ paddingTop: 20, marginLeft: 10 }}>
                      {" "}
                      <strong>{askedby.display}</strong> asks:
                    </Typography>
                  </div>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography className={classes.description}>
                        {question.description}{" "}
                      </Typography>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        className={classes.date}
                      >
                        <Typography>
                          Posted{" "}
                          {format(
                            parseISO(question.createdAt),
                            "MMMM dd, yyyy"
                          )}
                        </Typography>
                        <div>
                          <Grid container alignItems="center">
                            <Icon src="/static/visibility.svg" />{" "}
                            <span style={{ paddingLeft: 10 }}>
                              {question.views} views
                            </span>
                          </Grid>
                        </div>
                      </Grid>
                      <Typography
                        style={{ display: "inline-flex", marginRight: 10 }}
                      >
                        <strong> Tags:</strong>
                      </Typography>{" "}
                      {this.tagsList(question.tags, classes)}
                      {this.handleEdit(question, user)}
                      <ApproveQuestion
                        hasPermissions={hasPermissions}
                        isApproved={isApproved}
                        id={this.props.id}
                        approval={this.props.question.approval}
                      />
                    </Grid>
                    <Grid item xs={2} container>
                      <Grid item xs={4}>
                        <Icon
                          onClick={this.upVote}
                          src="/static/thumb_up.svg"
                        />
                        <div>{question.upVotes}</div>
                      </Grid>
                      <Grid item xs={4}>
                        <Icon
                          onClick={this.downVote}
                          src="/static/thumb_down.svg"
                        />
                        <div>{question.downVotes}</div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs />
            </Grid>
          );
        }}
      </Query>
    );
  }
}

MainQuestion.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withApollo(MainQuestion));
