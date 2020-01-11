import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

import Error from './../ErrorMessage.js';
import { ALL_USERS_QUERY } from '../auth/Permissions.js';
import Users from './Users';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'points', label: 'Points', minWidth: 100 },
  {
    id: 'questions',
    label: 'Questions',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'answers',
    label: 'Answers',
    minWidth: 170,
    align: 'right'
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    margin: theme.spacing(15),
    padding: theme.spacing(1),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
}));

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Query query={ALL_USERS_QUERY}>
      {({ data: { users }, loading, error }) => {
        console.log(users);

        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <p>Error</p>;

        return (
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Dispaly</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>Questions</TableCell>
                  <TableCell>Answers</TableCell>
                </TableRow>
              </TableHead>
              {users.map(users => (
                <Users user={users} key={users.id} />
              ))}
            </Table>
          </Paper>
        );
      }}
    </Query>
  );
}
