import React from 'react'
import Header from '../header'
import Meta from '../meta/Meta.js'
import Footer from '../footer'
import { withStyles } from "@material-ui/core/styles";

const styles = ({ layout }) => {
  return ({
  root: {
    width: layout.width,
    minHeight: layout.height,
    display: 'flex',
    flexDirection: 'column',
  },
  contentContainer: {
    display: 'flex',
    padding: '2rem 2rem 1rem 2rem',
    flex: 1,
    minHeight: layout.contentMinHeight,
  },
})};

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
