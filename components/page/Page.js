import React from 'react';
import Head from 'next/head';
import Header from '../new-header';
import Meta from '../meta/Meta.js';
import Footer from '../footer';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';
import classNames from 'classnames';
import { CURRENT_USER_QUERY } from '../auth/User';
import { Query } from 'react-apollo';
import Drift from 'react-driftjs';

import LinearProgress from '@material-ui/core/LinearProgress';
import Error from './../ErrorMessage.js';

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
  const isScrollablePage =
    router.pathname === '/all' ||
    router.pathname === '/myfeed' ||
    router.pathname === '/tags' ||
    router.pathname === '/myquestions' ||
    router.pathname === '/mybookmarks' ||
    router.pathname === '/users';
  const isLanding =
    router.pathname === '/' ||
    router.pathname === '/blog' ||
    router.pathname === '/stories' ||
    router.pathname === '/signup' ||
    router.pathname === '/signin' ||
    router.pathname === '/points' ||
    router.pathname === '/post';

  const toUpperFirst = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getPageName = () => {
    let pageName = '';
    const pathWords = router.pathname.split('/');
    if (router.pathname === '/') {
      pageName = 'Home';
    } else {
      pathWords.forEach(w => {
        pageName += toUpperFirst(w);
        pageName += ' ';
      });
    }
    return pageName;
  };

  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data: { me }, error, loading }) => {
        return (
          <div className={classes.root}>
            <Meta />
            <Head>
              <title>ENTRA - {getPageName()}</title>
            </Head>
            <Header me={me} loading={loading} />
            {loading ? <LinearProgress variant="query" /> : null}
            {error ? <Error error={error} /> : null}

            <div
              className={classNames(
                isLanding || isSearchResultPage || isScrollablePage
                  ? 'noPadding'
                  : 'contentContainerPadding',
                isSearchResultPage || isScrollablePage ? 'hideScroll' : ''
              )}
            >
              <div
                className={classNames(
                  isSearchResultPage || isScrollablePage
                    ? classes.scrollContainer
                    : classes.contentContainer,
                  'contentContainer'
                )}
              >
                {children}
              </div>
              {isLanding && <Drift appId="rz4xagciytry" />}
            </div>
            {isLanding && <Footer />}
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(withStyles(styles)(Page));
