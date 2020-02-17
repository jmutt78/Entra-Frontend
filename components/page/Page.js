import React from 'react';
import Header from '../new-header';
import Meta from '../meta/Meta.js';
import Footer from '../footer';
import { withRouter } from 'next/router';
import { CURRENT_USER_QUERY } from '../auth/User';
import { Query } from 'react-apollo';
import Drift from 'react-driftjs';
import styled from 'styled-components';

import LinearProgress from '@material-ui/core/LinearProgress';
import Error from './../ErrorMessage.js';

import './Page.css';

const Root = styled.div`
  display: flex;
  width: ${props => props.theme.layout.width};
  height: ${props => props.theme.layout.height};
  flex-direction: column;
`;

const Page = ({ children, classes, router }) => {
  const isLanding =
    router.pathname === '/' ||
    router.pathname === '/blog' ||
    router.pathname === '/stories' ||
    router.pathname === '/signup' ||
    router.pathname === '/signin' ||
    router.pathname === '/points' ||
    router.pathname === '/post';

  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data: { me }, error, loading }) => {
        return (
          <Root>
            <Meta />
            <Header me={me} />
            {loading ? <LinearProgress variant="determinate" /> : null}
            {error ? <Error error={error} /> : null}
            {children}
            {isLanding && <Drift appId="rz4xagciytry" />}
            {isLanding && <Footer />}
          </Root>
        );
      }}
    </Query>
  );
};

export default withRouter(Page);
