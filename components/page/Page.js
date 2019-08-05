import React from 'react'
import Header from '../header/Header.js'
import Meta from '../meta/Meta.js'
import Footer from '../footer'
import { makeStyles, createStyles } from '@material-ui/styles'

const useStyles = makeStyles(({ layout }) =>
  createStyles({
    root: {
      width: '100vw',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    contentContainer: {
      flex: 1,
      // should come from layout - `calc(100vh - (headerHeight + navHeight))`
      minHeight: `calc(100vh - 200px)`,
    },
  })
)

const Page = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Meta />
      <Header />
      <div className={classes.contentContainer}>{children}</div>
      <Footer />
    </div>
  )
}

export default Page
