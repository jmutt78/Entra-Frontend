import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import { Query } from "react-apollo";
import Link from "next/link";
import gql from "graphql-tag";

import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withApollo } from "react-apollo";
import questionQuery from "./questionQuery";
import Icon from "../ui/Icon";

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
  }
});

const CREATE_QUESTION_VOTE_MUTATION = gql`
  mutation CREATE_QUESTION_VOTE_MUTATION($questionId: ID!, $vote: String) {
    createQuestionVote(questionId: $questionId, vote: $vote)
  }
`;

class MainQuestion extends Component {
  componentDidMount() {
    this.props.createQuestionView();
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

  render() {
    const { classes } = this.props;
    const question = this.props.question;
    console.log(question);
    const askedby = this.props.question.askedBy[0];
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
                    {format(parseISO(question.createdAt), "MMMM dd, yyyy")}
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
                <Typography style={{ display: "inline-flex", marginRight: 10 }}>
                  <strong> Tags:</strong>
                </Typography>{" "}
                {this.tagsList(question.tags, classes)}
              </Grid>
              <Grid item xs={2} container>
                <Grid item xs={4}>
                  <Icon onClick={this.upVote} src="/static/thumb_up.svg" />
                  <div>{question.upVotes}</div>
                </Grid>
                <Grid item xs={4}>
                  <Icon onClick={this.downVote} src="/static/thumb_down.svg" />
                  <div>{question.downVotes}</div>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs />
      </Grid>
    );
  }
}

MainQuestion.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withApollo(MainQuestion));
