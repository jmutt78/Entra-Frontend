import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Table from '@material-ui/core/Table'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import PaginationActions from './PaginationActions';
import { perPage } from '../../config.js'
import Error from '../ErrorMessage'

const styles = theme => ({
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

function Pagination({ filter, page, classes }) {
  function handleChangePage(event, newPage) {
    // TODO paginate
    // setPage(newPage);
  }

  return (
    <Query query={PAGINATION_QUERY} variables={{ filter: filter }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <Error error={error} />

        const count = data.questionsConnection.aggregate.count

        return (
          <Table className={classes.table}>
            <TableFooter>
              <TableRow>
                <div className={classes.paginationContainer}>
                  <TablePagination
                    rowsPerPageOptions={false}
                    colSpan={3}
                    count={count}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={handleChangePage}
                    ActionsComponent={PaginationActions}
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
