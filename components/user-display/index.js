import React, { Component } from 'react';
import { Query } from 'react-apollo';

import Error from './../ErrorMessage.js';
import QaDisplay from '../account/QaDisplay';
import MainInfoDisplay from '../account/MainInfoDisplay';
import StepProgressBar from '../account/StepProgressBar';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';

export const USER_QUERY = gql`
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
      points
      instagram
      twitter
      linkedIn
      facebook
      website
      shareEmail
      shareSocial
      myBookMarks {
        id
        questions {
          id
        }
      }
      myQuestions {
        id
        questionVote {
          id
          vote
        }
      }
      mastery {
        level1
        level2
        level3
        level4
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

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 800
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: '3rem'
  },
  contentContainer: {
    width: '100%',
    maxWidth: 1000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  icon: {
    color: 'black'
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
        {({ data, loading, variables, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const user = data.user;
          return (
            <div className={classes.root}>
              <div container className={classes.container}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="h3" className={classes.title}>
                          {`${user.name}'s Profile`}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>

                <div className={classes.contentContainer}>
                  <MainInfoDisplay user={user} />
                  <QaDisplay user={user} />
                  <StepProgressBar user={user} />
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(DisplayUser);
