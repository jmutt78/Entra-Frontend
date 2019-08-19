import React, { Component } from 'react'
import { Query } from 'react-apollo'

import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import BadgesDisplay from './BadgesDisplay'
import MainInfoDisplay from './MainInfoDisplay'
import QaDisplay from './QaDisplay'

import { CURRENT_USER_QUERY } from '../auth/User'

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 1000,
    display: 'flex',
    justifyContent: 'center',
  },
})

class DisplayAccount extends Component {
  render() {
    const { classes } = this.props
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>
          const user = data.me

          return (
            <Grid container className={classes.container}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="display3" className={classes.title}>
                        {`${user.name}'s Profile`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <div className={classes.contentContainer}>
                <MainInfoDisplay user={user} />
                <QaDisplay user={user} />
                <BadgesDisplay user={user} />
              </div>
            </Grid>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(DisplayAccount)
