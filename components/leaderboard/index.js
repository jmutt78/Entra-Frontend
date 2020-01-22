import React from 'react';
import { Query } from 'react-apollo';
import { _ } from 'lodash';
import PropTypes from 'prop-types';

import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';

import CircularProgress from '@material-ui/core/CircularProgress';

import Error from './../ErrorMessage.js';
import { ALL_LEADERBOARD_USERS_QUERY } from '../auth/Permissions.js';

function createData(id, name, points, questions, answers) {
  return { id, name, points, questions, answers };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  { id: 'points', numeric: true, disablePadding: false, label: 'Points' },
  { id: 'questions', numeric: true, disablePadding: false, label: 'Questions' },
  { id: 'answers', numeric: true, disablePadding: false, label: 'Answers' }
];

function EnhancedTableHead(props) {
  const {
    classes,

    order,
    orderBy,

    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();

  return (
    <Typography className={classes.title} variant="h6" id="tableTitle">
      LeaderBoard
    </Typography>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  table: {
    minWidth: 700
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  nameLink: {
    fontWeight: 500,
    textDecoration: 'none',
    color: '#e27d60',
    fontSize: '1rem',
    '@media (max-width: 650px)': {
      fontSize: '.80rem'
    }
  },
  pointLink: {
    fontWeight: 500,
    textDecoration: 'none',
    fontSize: '1rem',
    color: 'black',
    '@media (max-width: 650px)': {
      fontSize: '.80rem'
    }
  },
  pagination: { marginLeft: 0 }
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Query
      query={ALL_LEADERBOARD_USERS_QUERY}
      variables={{
        filter: 'leaderboard'
      }}
    >
      {({ data: { users }, loading, error }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;

        const rows = users.map(data =>
          createData(
            data.id,
            data.display,
            data.points,
            Object.keys(data.myQuestions).length,
            Object.keys(data.myAnswers).length
          )
        );

        const emptyRows =
          rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        return (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <EnhancedTableToolbar />
              <div className={classes.tableWrapper}>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={'medium'}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getSorting(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow hover tabIndex={-1} key={row.name}>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              <Link
                                href={{
                                  pathname: '/user',
                                  query: { id: row.id }
                                }}
                              >
                                <a className={classes.nameLink}>{row.name}</a>
                              </Link>
                            </TableCell>
                            <TableCell align="right">
                              <Typography className={classes.pointLink}>
                                {row.points}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Link
                                href={{
                                  pathname: '/users',
                                  query: { id: row.id }
                                }}
                              >
                                <a className={classes.pointLink}>
                                  {row.questions}
                                </a>
                              </Link>
                            </TableCell>
                            <TableCell align="right">
                              <Link
                                href={{
                                  pathname: '/answers',
                                  query: { id: row.id }
                                }}
                              >
                                <a className={classes.pointLink}>
                                  {row.answers}
                                </a>
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <TablePagination
                classes={{ actions: classes.pagination }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'previous page'
                }}
                nextIconButtonProps={{
                  'aria-label': 'next page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        );
      }}
    </Query>
  );
}
