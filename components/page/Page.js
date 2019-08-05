import React from 'react'
import Header from '../header/Header.js'
import Meta from '../meta/Meta.js'
import Footer from '../footer'
import { makeStyles } from '@material-ui/core/styles'

const styles = {
  mainLayout: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  contentContainer: {
    flex: 1,
  },
}

const Page = ({ children }) => {
  const { mainLayout, contentContainer } = styles

  return (
    <div style={mainLayout}>
      <Meta />
      <Header />
      <div style={contentContainer}>{children}</div>
      <Footer />
    </div>
  )
}

export default Page
