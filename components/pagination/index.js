import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Table from '@material-ui/core/Table'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import PaginationActions from './PaginationActions'
import { perPage } from '../../config.js'
import Error from '../ErrorMessage'

const styles = theme => ({
  paginationContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '15px 0 0 0',
  },
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
  return (
    <Query query={PAGINATION_QUERY} variables={{ filter: filter }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <Error error={error} />

        const count = data.questionsConnection.aggregate.count
        const pages = Math.ceil(count / perPage)

        return (
          <div className={classes.paginationContainer} style={pages <= 1 ? { display: 'none' } : {}}>
            <Typography>
              <h3>{`Showing page ${page} of ${pages}`}</h3>
            </Typography>
            <PaginationActions page={page} pages={pages} />
          </div>
        )
      }}
    </Query>
  )
}

export default withStyles(styles)(Pagination)
export { PAGINATION_QUERY }
