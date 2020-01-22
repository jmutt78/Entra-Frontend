import React, { Component } from 'react';
import { Query } from 'react-apollo';

import StepProgressBar from './StepProgressBar';

import Error from './../ErrorMessage.js';
import MainInfoDisplay from './MainInfoDisplay';
import QaDisplay from './QaDisplay';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { CURRENT_USER_QUERY_PROFILE } from '../auth/User';

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

class DisplayAccount extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={CURRENT_USER_QUERY_PROFILE}>
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;

          const user = data.me;

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

export default withStyles(styles)(DisplayAccount);
