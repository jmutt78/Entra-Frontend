import React from 'react'

import Grid from '@material-ui/core/Grid'

import NProgress from 'nprogress'

import Navbar from './Navbar'
import Appbar from './Appbar'

import Router from 'next/router'
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

const Header = ({ classes }) => {
  return (
    <User>
      {({ data: { me } }) => (
        <Grid container spacing={16}>
          <Navbar />
          <Appbar isLoggedIn={!!me} />
        </Grid>
      )}
    </User>
  )
}

export default Header
