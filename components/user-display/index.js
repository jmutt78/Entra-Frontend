import React, { Component } from "react";
import { Query } from "react-apollo";
import { format, parseISO } from "date-fns";
import QaDisplay from "../account/QaDisplay";
import MainInfoDisplay from "../account/MainInfoDisplay";
import BadgesDisplay from "../account/BadgesDisplay";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import gql from "graphql-tag";

const USER_QUERY = gql`
  query USER_QUERY($id: ID!) {
    user(id: $id) {
      id
      email
      display
      name
      permissions
      createdAt
      updatedAt
      location
      about
      industry
      image
      myQuestions {
        id
      }
      badges {
        autobiographer
        critic
        patron
        reviewer
        analyst
        commentor
        frequentFlyer
      }
      myAnswers {
        id
        selected
        answerVote {
          id
          vote
        }
        answeredTo {
          id
        }
      }
    }
  }
`;

// TODO: badge dispaly is not working properly

const styles = theme => ({
  grid: {
    margin: theme.spacing.unit
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  }
});

class DisplayUser extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query
        query={USER_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading, variables }) => {
          if (loading) return <p>Loading...</p>;
          const user = data.user;
          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={12}>
                <MainInfoDisplay user={user} />
              </Grid>
              <Grid item xs={2} className={classes.grid} />
              <Grid item xs={9} className={classes.grid}>
                <QaDisplay user={user} />
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <BadgesDisplay user={user} />
              </Grid>
              <Grid item xs={2} className={classes.grid} />
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(DisplayUser);
