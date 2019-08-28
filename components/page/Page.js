import React from 'react'
import Header from '../header'
import Meta from '../meta/Meta.js'
import Footer from '../footer'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'next/router'

import './Page.css'

const styles = ({ layout }) => {
  return {
    root: {
      width: '100%', //layout.width,
      height: '100%', //layout.height,
      display: 'flex',
      flexDirection: 'column',
    },
    contentContainer: {
      display: 'flex',
      flex: 1,

      minHeight: layout.contentMinHeight,
      overflowX: 'scroll',
    },
  }
}

const Page = ({ children, classes, router }) => {
  const isLanding = router.pathname === '/'
  return (
    <div className={classes.root}>
      <Meta />
      <Header />
      <div className={isLanding ? 'noPadding' : 'contentContainerPadding'}>
        <div className={classes.contentContainer}>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default withRouter(withStyles(styles)(Page))
