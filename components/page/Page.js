import React from 'react'
import Header from '../header'
import Meta from '../meta/Meta.js'
import Footer from '../footer'
import { withStyles } from '@material-ui/core/styles'

const styles = ({ layout }) => {
  return {
    root: {
      minWidth: '100%', //layout.width,
      minHeight: 80, //layout.height,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    contentContainer: {
      display: 'flex',
      padding: '2rem 2rem 1rem 2rem',
      flex: 1,
      minHeight: 'calc(100% - 80px - 80px)' //layout.contentMinHeight,
    },
  }
}

const Page = ({ children, classes }) => {
  return (
    <div className={classes.root}>
      <Meta />
      <Header />
      <div className={classes.contentContainer}>{children}</div>
      <Footer />
    </div>
  )
}

export default withStyles(styles)(Page)
