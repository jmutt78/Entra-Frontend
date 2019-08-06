import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Link from 'next/link'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Avatar from './Avatar'
import User from '../auth/User.js'

const styles = ({ layout, palette }) => ({
  appbar: {
    background: '#85BDCB',
    boxShadow: 'none',
  },
  text: {
    flexGrow: 100,
    color: 'white',
    fontSize: 16,
  },
  navText: {
    color: 'white',
    fontSize: '1.5rem',
    marginLeft: '2rem',
    position: 'relative',
    zIndex: 2,
    textDecoration: 'none',
    fontSize: 20,
    fontWieght: 'strong',
  },

  // own
  container: {
    width: layout.width,
    height: layout.navHeight,
    display: 'flex',
    alignItems: 'center',
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 20px 0 0',
  },
  navigationContainer: {
    flex: 1,
  },
})

class NavTop extends Component {
  handleApproval(me, classes) {
    const hasPermissions = me.permissions.some(permission => ['ADMIN', 'MODERATOR'].includes(permission))

    if (!hasPermissions) {
      return <div />
    }
    return (
      <Toolbar>
        <Typography>
          <Link href="/approval/question-list">
            <a className={classes.navText}>Approve Questions</a>
          </Link>
        </Typography>

        <Typography>
          <Link href="/approval/answer-list">
            <a className={classes.navText}>Approve Answers</a>
          </Link>
        </Typography>
      </Toolbar>
    )
  }

  render() {
    const { classes } = this.props
    return (
      <User>
        {({ data: { me } }) => (
          <AppBar className={classes.appbar} position="static">
            <div className={classes.container}>
              <div className={classes.navigationContainer}>
                {`hi`}
              </div>
              <div className={classes.avatarContainer}>
                <Avatar me={me} />
                <Typography variant="h4" className={classes.text}>
                  <p>{me.name}</p>
                </Typography>
              </div>
            </div>

          </AppBar>
        )}
      </User>
    )
  }
}

export default withStyles(styles)(NavTop)

// <Toolbar>
//   <Avatar me={me} />
//   <Typography variant="h5" className={classes.text}>
//     <p>{me.name}</p>
//   </Typography>
//   {this.handleApproval(me, classes)}
//   <Typography>
//     <Link href="/myquestions">
//       <a className={classes.navText}>My Questions</a>
//     </Link>
//   </Typography>
//   <Typography>
//     <Link href="/myanswers">
//       <a className={classes.navText}>My Answers</a>
//     </Link>
//   </Typography>
//   <Typography>
//     <Link href="/mybookmarks">
//       <a className={classes.navText}>My Bookmark</a>
//     </Link>
//   </Typography>
// </Toolbar>
