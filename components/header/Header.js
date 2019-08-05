import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles } from '@material-ui/styles'

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

const useStyles = makeStyles(({ layout }) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: '#F2F4EF',
    },
    flexContainer: {
      width: '100vw',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      backgroundColor: '#E27D60',
    },
    loginButton: {
      backgroundColor: '#b2bec3',
    },
    logo: {
      marginTop: '1rem',
      marginLeft: '2rem',
      maxHeight: '60px',
      maxWidth: '170px',
      width: '170px',
      height: '60px',
    },
    navLinks: {
      fontSize: '1.5rem',
      marginLeft: '2rem',
      position: 'relative',
      zIndex: 2,
      textDecoration: 'none',
      color: 'black',
    },
  })
)

const Navbar = () => {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.root}>
      <TopNav />
    </AppBar>
  )
}

const Appbar = ({ isLoggedIn }) => {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <div className={classes.flexContainer}>
          <div className={ classes.subContainer }>
            <Typography variant="h6">
              <Link href="/">
                <a>
                  {<img className={classes.logo} src="static/Screen Shot 2019-05-07 at 10.37.21 AM.jpg" />}
                </a>
              </Link>
            </Typography>
          </div>

          <div className={ classes.subContainer }>
            <Typography>
              <Link href={isLoggedIn ? '/qa' : '/signup'}>
                <a className={classes.navLinks}>Ask a Question</a>
              </Link>
            </Typography>

            <Typography>
              <Link href="/blogs">
                <a className={classes.navLinks}>Blog</a>
              </Link>
            </Typography>
          </div>

          <div className={ classes.subContainer }>
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

const Header = props => {
  const classes = useStyles()

  return (
    <User>
      {({ data: { me } }) => (
        <Grid container className={classes.root} spacing={16}>
          <Navbar />
          <Appbar isLoggedIn={!!me} />
        </Grid>
      )}
    </User>
  )
}

export default Header
