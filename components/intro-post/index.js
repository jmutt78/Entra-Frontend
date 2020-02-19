import React from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import Link from 'next/link';
import { withRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import { Mixpanel } from '../../utils/Mixpanel';
import CreateComment from './CreateComment';
import Error from './../ErrorMessage.js';
import CircularProgress from '@material-ui/core/CircularProgress';

export const INTRO_QUERY = gql`
  query INTRO_QUERY($id: ID!) {
    intro(id: $id) {
      id
      about
      approval
      challenges
      createdAt
      introduction

      postedBy {
        id
        display
        image
        name
      }
      comments {
        approval
        body
        commentBy {
          display
          id
          name
          image
        }
      }
    }
  }
`;

const useStyles = makeStyles({
  avatar: {
    width: 100,
    height: 100,
    cursor: 'pointer'
  }
});

export const Root = styled.div`
  flex-grow: 1;
  max-width: 900px;
  padding-top: 50px;
  margin-left: auto;
  margin-right: auto;
`;

export const CreditContainer = styled.div`
  flex-grow: 1;
  padding-bottom: 20px;
  margin: 0 auto;
  position: relative;
  width: auto;
  font-size: 1.75rem !important;
  font-weight: 600;
`;

export const AvatarContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 30px;
  max-width: 100px;
`;

export const NameContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  justify-content: center;
  a {
    text-decoration: none;
    color: #e27d60;
  }
`;

function handleUserTracking(e) {
  Mixpanel.track('User Profile');
}

export default function Intro({ id }) {
  const classes = useStyles();

  return (
    <Query
      query={INTRO_QUERY}
      variables={{
        id
      }}
    >
      {({ data: { intro }, loading, error }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;

        const user = intro.postedBy[0];
        const userId = intro.postedBy[0].id;
        const display = intro.postedBy[0].display;

        const introduction = intro.introduction;
        const about = intro.about;
        const challenges = intro.challenges;

        const createdAt = intro.createdAt;
        const approval = intro.approval;

        return (
          <Root>
            <CreditContainer>
              <AvatarContainer>
                <Link
                  href={{
                    pathname: '/user',
                    query: { id: user.id }
                  }}
                >
                  {user.image === null || user.image === '' ? (
                    <Avatar className={classes.avatar}>
                      {user.display[0]}
                    </Avatar>
                  ) : (
                    <Avatar
                      alt={user.name}
                      src={user.image}
                      className={classes.avatar}
                    />
                  )}
                </Link>
              </AvatarContainer>
              <NameContainer>
                Welcome{' '}
                <Link
                  href={{
                    pathname: '/user',
                    query: { id: userId }
                  }}
                >
                  <a className={classes.nameLink} onClick={handleUserTracking}>
                    {display}
                  </a>
                </Link>{' '}
                to the community!
              </NameContainer>
            </CreditContainer>

            <Paper
              style={{
                background: '#f2f4ef',
                padding: '30px',
                marginLeft: 15,
                marginRight: 15
              }}
            >
              <h3>Introduction </h3>
              <p>{introduction}</p>
              <h3>Challenges </h3>
              <p>{challenges}</p>
              <h3>How can the community help? </h3>
              <p>{about}</p>
            </Paper>
            <CreateComment id={id} />
          </Root>
        );
      }}
    </Query>
  );
}
