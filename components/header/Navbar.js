import React from 'react'

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import NavLink from './NavLink'

import Avatar from './Avatar'
import User from '../auth/User.js'

import './Navbar.css'

const styles = ({ layout, palette }) => ({
  root: {
    width: layout.width,
    background: palette.accent.blue,
    minHeight: layout.headerHeight,
  },

  navText: {
    color: 'white',
    marginLeft: '2rem',
    position: 'relative',
    zIndex: 2,
    textDecoration: 'none',
    fontSize: 20,
    fontWieght: 'strong',
  },

  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 35px 0 0',
    color: 'white',
    fontSize: '1.1rem',
    alignSelf: 'flex-end',
  },
  navigationContainer: {
    display: 'flex',
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: '0 0 0 20px',
  },
  navLink: {
    // TODO change to width on mobile
    height: layout.navHeight,
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.2rem',
    color: palette.secondary.light,
    padding: '12px 10px 8px 10px',
    textDecoration: 'none',
    '&:hover': {
      color: palette.primary.dark,
    },
  },
  navLinkActive: {
    height: layout.navHeight,
    display: 'flex',
    alignItems: 'center',
    color: palette.primary.main,
    background: palette.secondary.main,
    fontWeight: 500,
  },
})

const Navbar = ({ classes }) => {
  const navLinks = [
    {
      name: 'My Questions',
      target: '/myquestions',
    },
    {
      name: 'My Answers',
      target: '/myanswers',
    },
    {
      name: 'My Bookmarks',
      target: '/mybookmarks',
    },
  ]

  const adminLinks = [
    {
      name: 'Approve Questions',
      target: '/approval/question-list',
    },
    {
      name: 'Approve Answers',
      target: '/approval/answer-list',
    },
  ]

  return (
    <div className="style-target" style={{ width: '100%' }}>
      <User>
        {({ data: { me } }) => (
          <div className={classes.root}>
            <div className="navbarFlex">
              <Typography className={classes.navigationContainer}>
                {me &&
                  me.permissions.some(permission => ['ADMIN', 'MODERATOR'].includes(permission)) &&
                  adminLinks.map(({ name, target }) => (
                    <NavLink activeClassName={classes.navLinkActive} href={target} key={name}>
                      <a className={classes.navLink}>{name}</a>
                    </NavLink>
                  ))}

                {navLinks.map(({ name, target }) => (
                  <NavLink activeClassName={classes.navLinkActive} href={target} key={name}>
                    <a className={classes.navLink}>{name}</a>
                  </NavLink>
                ))}
              </Typography>

              {me && (
                <Typography className={classes.avatarContainer}>
                  <Avatar me={me} />
                  <div>{me.name}</div>
                </Typography>
              )}
            </div>
          </div>
        )}
      </User>
    </div>
  )
}

export default withStyles(styles)(Navbar)
