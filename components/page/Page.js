import React from 'react'
import Header from '../header'
import Meta from '../meta/Meta.js'
import Footer from '../footer'
import { withStyles } from '@material-ui/core/styles'

import './Page.css'

const styles = ({ layout }) => {
  return {
    root: {
      width: layout.width,
      height: layout.height,
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

const Page = ({ children, classes }) => {
  return (
    <div className={classes.root}>
      <Meta />
      <Header />
      <div className="contentContainerPadding">
        <div className={classes.contentContainer}>{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default withStyles(styles)(Page)
