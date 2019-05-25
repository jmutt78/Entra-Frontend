import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";

import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const SINGLE_QUESTION_QUERY = gql`
  query SINGLE_QUESTION_QUERY($id: ID!) {
    question(where: { id: $id }) {
      id
      title
      description
      askedBy {
        id
        display
        image
        name
      }
      createdAt
      answers {
        id
        body
      }
      tags {
        id
        name
      }
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
  }
});

class MainQuestion extends Component {
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

    return (
      <Query
        query={SINGLE_QUESTION_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;

          const question = data.question;
          const askedby = data.question.askedBy[0];

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
                  <Typography className={classes.description}>
                    {question.description}{" "}
                  </Typography>
                  <Typography className={classes.date}>
                    Posted{" "}
                    {format(parseISO(question.createdAt), "MMMM dd, yyyy")}
                  </Typography>
                  <Typography
                    style={{ display: "inline-flex", marginRight: 10 }}
                  >
                    <strong> Tags:</strong>
                  </Typography>{" "}
                  {this.tagsList(question.tags, classes)}
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

export default withStyles(styles)(MainQuestion);
