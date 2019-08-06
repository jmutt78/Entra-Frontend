import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Link from 'next/link'
import NProgress from 'nprogress'
import Nav from '../nav/Nav'
import Router from 'next/router'
import TopNav from '../nav/NavTop'
import User from '../auth/User.js'

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

const styles = ({ layout, palette }) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#F2F4EF',
  },
  flexContainer: {
    width: layout.width,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flexContainerMedia: {
    flexDirection: 'column',
  },
  subContainer: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  button: {
    margin: 12,
  },
  signupButton: {
    backgroundColor: palette.primary.dark,
    '&:hover': {
      backgroundColor: palette.primary.main,
    },
  },
  loginButton: {
    backgroundColor: palette.accent.grey,
    '&:hover': {
      backgroundColor: palette.primary.main,
    },
  },
  logo: {
    marginTop: '1rem',
    marginLeft: '2rem',
    maxHeight: '60px',
    maxWidth: '170px',
    width: '170px',
    height: '60px',
  },
  spacing: {
    width: 25,
  },
  navLink: {
    fontSize: '1.4rem',
    padding: '4px 0 0 0',
    cursor: 'pointer',
    fontWeight: 500,
    color: palette.accent.dark,
  },
})

const Navbar = ({ classes }) => {
  return (
    <AppBar position="static" className={classes.root}>
      <TopNav />
    </AppBar>
  )
}

const Appbar = ({ isLoggedIn, classes }) => {
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <div className={classes.flexContainer}>
          <div className={classes.subContainer}>
            <Typography variant="h6">
              <Link href="/">
                <a>
                  {<img className={classes.logo} src="static/Screen Shot 2019-05-07 at 10.37.21 AM.jpg" />}
                </a>
              </Link>
            </Typography>
          </div>

          <div className={classes.subContainer}>
            <Typography>
              <Link href={isLoggedIn ? '/qa' : '/signup'}>
                <h3 className={classes.navLink}>Ask a Question</h3>
              </Link>
            </Typography>

            <div className={classes.spacing} />

            <Typography>
              <Link href="/blogs">
                <h3 className={classes.navLink}>Blog</h3>
              </Link>
            </Typography>
          </div>

          <div className={classes.subContainer}>
            <Link href="/login">
              <Button variant="contained" color="secondary" className={[classes.button, classes.loginButton]}>
                Login
              </Button>
            </Link>

            <Link href="/signup">
              <Button
                variant="contained"
                color="secondary"
                className={[classes.button, classes.signupButton]}
              >
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const Header = ({ classes }) => {
  return (
    <User>
      {({ data: { me } }) => (
        <Grid container className={classes.root} spacing={16}>
          <Navbar classes={classes} />
          <Appbar isLoggedIn={!!me} classes={classes} />
        </Grid>
      )}
    </User>
  )
}

export default withStyles(styles)(Header)
