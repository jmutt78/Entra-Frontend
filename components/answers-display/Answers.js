import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";

import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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

  render() {
    const { classes } = this.props;
    const answers = this.props.question.answers;

    console.log(answers);
    return (
      <div>
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs />
          <Grid item xs={7} className={classes.grid}>
            {this.handleTitle(answers)}
            {answers.map(answers => (
              <div key={answers.id} className={classes.info}>
                <div className={classes.photoTitle}>
                  {this.handleImage(
                    answers.answeredBy.image,
                    answers.answeredBy.display,
                    classes
                  )}
                  <Typography style={{ paddingTop: 20, marginLeft: 10 }}>
                    <strong>{answers.answeredBy.display}</strong> says:
                  </Typography>
                </div>
                <Typography className={classes.description}>
                  {answers.body}
                </Typography>
                <Typography className={classes.date}>
                  Posted {format(parseISO(answers.createdAt), "MMMM dd, yyyy")}
                </Typography>
              </div>
            ))}
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    );
  }
}

Answers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Answers);
