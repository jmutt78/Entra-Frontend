import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { useRouter } from 'next/router'

import FirstPageIcon from '@material-ui/icons/FirstPage'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { perPage } from '../../config.js'
import Error from '../ErrorMessage'

const styles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: '3rem',
  },
  paginationContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '15px 0 0 0',
  }
})

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY($filter: String!) {
    questionsConnection(filter: $filter) {
      aggregate {
        count
      }
    }
  }
`

function TablePaginationActions(props) {
  const { classes, count, page, rowsPerPage, onChangePage } = props

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0)
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1)
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1)
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        <LastPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <FirstPageIcon />
      </IconButton>
    </div>
  )
}

function Pagination({ filter, page, classes }) {
  const router = useRouter()

  // const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const emptyRows = (count, page) => rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage)

  function handleChangePage(event, newPage) {
    // setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10))
    // setPage(0);
  }

  return (
    <Query query={PAGINATION_QUERY} variables={{ filter: filter }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <Error error={error} />

        const count = data.questionsConnection.aggregate.count
        const pages = Math.ceil(count / perPage)

        return (
          <Table className={classes.table}>
            <TableFooter>
              <TableRow>
                <div className={classes.paginationContainer}>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={() => <TablePaginationActions classes={classes} />}
                  />
                </div>
              </TableRow>
            </TableFooter>
          </Table>
        )
      }}
    </Query>
  )
}

export default withStyles(styles)(Pagination)
export { PAGINATION_QUERY }
