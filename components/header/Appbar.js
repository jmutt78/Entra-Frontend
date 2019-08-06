import React from 'react'

import MaterialAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Link from 'next/link'

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
  // TODO do this in plain css
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
  navLink: {
    fontSize: '1.4rem',
    padding: '4px 25px 0 0',
    cursor: 'pointer',
    fontWeight: 500,
    color: palette.accent.dark,
  },
})

const Appbar = ({ isLoggedIn, classes }) => {
  const navlinks = [
    {
      name: 'Ask a question',
      target: isLoggedIn ? '/qa' : '/signup',
    },
    {
      name: 'Blog',
      target: '/blogs',
    },
  ]

  return (
    <MaterialAppBar position="static" className={classes.root}>
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

          <Typography>
            <div className={classes.subContainer}>
              {navlinks.map(({ name, target }) => (
                <Link href={target}>
                  <h3 className={classes.navLink}>{name}</h3>
                </Link>
              ))}
            </div>
          </Typography>

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
    </MaterialAppBar>
  )
}

export default withStyles(styles)(Appbar)
