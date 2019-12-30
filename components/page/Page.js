import React from 'react';
import Drift from 'react-driftjs';
import classNames from 'classnames';
import { Query } from 'react-apollo';
import { withRouter } from 'next/router';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Drawer from './Drawer';
import './Page.css';
import Error from './../ErrorMessage.js';
import Footer from '../footer';
import Meta from '../meta/Meta.js';
import { CURRENT_USER_QUERY } from '../auth/User';

const useStyles = makeStyles(theme => ({
  root: {},
  // content styles
  contentContainer: {
    display: 'flex',
    flex: 1,
    minHeight: theme.layout.contentMinHeight
  },
  scrollContainer: {
    display: 'flex',
    flex: 1,
    maxHeight: '100%'
  }
}));

const Page = ({ children, router }) => {
  const classes = useStyles();

  const isSearchResultPage = router.pathname === '/searchResults';
  const isScrollablePage =
    router.pathname === '/all' ||
    router.pathname === '/myfeed' ||
    router.pathname === '/tags' ||
    router.pathname === '/users';
  const isLanding = router.pathname === '/';

  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data: { me }, error, loading }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;

        return (
          <div className={classes.root}>
            <Meta />
            <Drawer>
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
                <Drift appId="rz4xagciytry" />
              </div>
            </Drawer>
            {isLanding && <Footer />}
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(Page);
