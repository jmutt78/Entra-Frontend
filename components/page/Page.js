import React from 'react';
import Header from '../header';
import Meta from '../meta/Meta.js';
import Footer from '../footer';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';
import classNames from 'classnames';

import Drift from 'react-driftjs';

import './Page.css';

const styles = ({ layout }) => {
  return {
    root: {
      width: layout.width,
      height: layout.height,
      display: 'flex',
      flexDirection: 'column'
    },
    contentContainer: {
      display: 'flex',
      flex: 1,
      minHeight: layout.contentMinHeight
    },
    scrollContainer: {
      display: 'flex',
      flex: 1,
      maxHeight: '100%'
    }
  };
};

const Page = ({ children, classes, router }) => {
  const isSearchResultPage = router.pathname === '/searchResults';
  const isAllPage = router.pathname === '/all';
  const isLanding =
    router.pathname === '/' ||
    router.pathname === '/landing1' ||
    router.pathname === '/landing2' ||
    router.pathname === '/landing3' ||
    router.pathname === '/giveaway';
  return (
    <div className={classes.root}>
      <Meta />
      <Header />
      <div
        className={classNames(
          isLanding || isSearchResultPage || isAllPage
            ? 'noPadding'
            : 'contentContainerPadding',
          isSearchResultPage || isAllPage ? 'hideScroll' : ''
        )}
      >
        <div
          className={classNames(
            isSearchResultPage || isAllPage
              ? classes.scrollContainer
              : classes.contentContainer,
            'contentContainer'
          )}
        >
          {children}
        </div>
        <Drift appId="rz4xagciytry" />
      </div>
      {isLanding && <Footer />}
    </div>
  );
};

export default withRouter(withStyles(styles)(Page));
