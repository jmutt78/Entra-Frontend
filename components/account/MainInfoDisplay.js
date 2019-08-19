import React, { Component } from 'react'
import { format, parseISO } from 'date-fns'
import { Query } from 'react-apollo'
import Link from 'next/link'
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import { CURRENT_USER_QUERY } from '../auth/User'

const styles = theme => ({
  bigAvatar: {
    width: 120,
    height: 120,
  },
  grid: {
    margin: theme.spacing.unit,
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40,
  },
  divider: {
    marginTop: theme.spacing.unit * 5,
  },
  about: {
    fontSize: 17,
    color: 'grey',
  },
})

class MainInfoDisplay extends Component {
  handleImage(user, classes) {}

  handleEdit(me, user, classes) {
    return <div />
  }

  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>
          const { classes } = this.props

          const user = this.props.user
          const me = data.me

          const dateToFormat = this.props.user.createdAt
          return (
            <>
              {user.image ? (
                <Avatar src={user.image} className={classes.bigAvatar} />
              ) : (
                <Avatar className={classes.bigAvatar}>{user.name[0]}</Avatar>
              )}

              <Typography variant="h4">{user.name}</Typography>
              <Typography variant="h6">{user.display}</Typography>
              <Typography variant="subheading">Location: {user.location}</Typography>
              <Typography variant="subheading">Industry: {user.industry}</Typography>
              <Typography>Member Since {format(parseISO(dateToFormat), 'MMMM dd, yyyy')}</Typography>

              {me.id === user.id ? (
                <Typography>
                  <Link href="/account/editaccount">
                    <a style={{ textDecoration: 'none', color: 'grey' }}>EDIT ACCOUNT INFO</a>
                  </Link>
                </Typography>
              ) : null}

              <Typography className={classes.about}>{user.about}</Typography>
              <Divider className={classes.divider} variant="middle" />
            </>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(MainInfoDisplay)
