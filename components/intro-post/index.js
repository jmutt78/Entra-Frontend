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
import Typography from '@material-ui/core/Typography';

import { CURRENT_USER_QUERY } from '../auth/User';
import { Mixpanel } from '../../utils/Mixpanel';
import CreateComment from './CreateComment';
import IntroCommnet from './Comment';
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
        id
        approval
        body
        createdAt
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

const Root = styled.div`
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

export const CommentTitle = styled.div`
  max-width: 850px;
  padding-left: 10px;
  margin-left: auto;
  margin-right: auto;
`;

function handleUserTracking(e) {
  Mixpanel.track('User Profile');
}

export default function Intro({ id }) {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data: { me }, loading, error }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
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
              const comments = intro.comments;

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
                          <Avatar
                            style={{
                              width: 100,
                              height: 100,
                              cursor: 'pointer'
                            }}
                          >
                            {user.display[0]}
                          </Avatar>
                        ) : (
                          <Avatar
                            alt={user.name}
                            src={user.image}
                            style={{
                              width: 100,
                              height: 100,
                              cursor: 'pointer'
                            }}
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
                        <a onClick={handleUserTracking}>{display}</a>
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
                    <p dangerouslySetInnerHTML={{ __html: introduction }} />

                    <h3>Challenges </h3>
                    <p dangerouslySetInnerHTML={{ __html: challenges }} />

                    <h3>How can the community help? </h3>
                    <p dangerouslySetInnerHTML={{ __html: about }} />
                  </Paper>
                  <CreateComment id={id} me={me} intro={intro} introId={id} />
                  <CommentTitle>
                    {comments === null ||
                    comments === '' ||
                    !comments.length ? null : (
                      <Typography variant="h5">
                        {comments.filter(({ approval }) => approval).length}{' '}
                        Comment
                        {comments.filter(({ approval }) => approval).length ===
                        1
                          ? ''
                          : 's'}
                      </Typography>
                    )}
                  </CommentTitle>
                  {comments.map(comments => (
                    <IntroCommnet
                      introId={id}
                      key={comments.commentBy.id}
                      me={me}
                      comments={comments}
                      commentBy={comments.commentBy}
                    />
                  ))}
                </Root>
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
}
