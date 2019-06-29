import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Query } from "react-apollo";
import ApproveAnswers from "../approval/AppoveAnswers.js";

import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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

  handleEdit(answers, user) {
    if (answers.answeredBy.id == user.id) {
      return (
        <Typography>
          <Link
            href={{
              pathname: "/edit-answer",
              query: { id: answers.id }
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
                    {answers.map(answers => {
                      console.log(answers);
                      const answeredBy = answers.answeredBy.id;
                      const ownsAnswer = answeredBy === user.id;
                      const isApproved = answers.approval === true;
                      const hasPermissions = user.permissions.some(permission =>
                        ["ADMIN", "MODERATOR"].includes(permission)
                      );

                      if (!ownsAnswer && !hasPermissions && !isApproved) {
                        return <div />;
                      }
                      return (
                        <div key={answers.id} className={classes.info}>
                          <div className={classes.photoTitle}>
                            {this.handleImage(
                              answers.answeredBy.image,
                              answers.answeredBy.display,
                              classes
                            )}
                            <Typography
                              style={{ paddingTop: 20, marginLeft: 10 }}
                            >
                              <strong>{answers.answeredBy.display}</strong>{" "}
                              says:
                            </Typography>
                          </div>
                          <Typography className={classes.description}>
                            {answers.body}
                          </Typography>
                          <Typography className={classes.date}>
                            Posted{" "}
                            {format(
                              parseISO(answers.createdAt),
                              "MMMM dd, yyyy"
                            )}
                          </Typography>
                          {this.handleEdit(answers, user)}

                          <ApproveAnswers
                            hasPermissions={hasPermissions}
                            isApproved={isApproved}
                            approval={answers.approval}
                            id={answers.id}
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

export default withStyles(styles)(Answers);
