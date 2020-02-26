import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { perPage } from '../../config.js';
import CommentList from './CommentList';
import Error from './../ErrorMessage.js';

import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';

export const INTRO_COMMENTS_QUERY = gql`
  query introComments($filter: String!, $skip: Int = 0, $first: Int = ${perPage}) {
    introComments(filter: $filter, first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      body
      createdAt
      approval
      commentBy {
        id
        display
        name
      }

      commentTo {
        id
      }
  }
}
`;

class IntroComments extends Component {
  render() {
    const filter = 'approval';
    const { page } = this.props;
    return (
      <Query
        query={INTRO_COMMENTS_QUERY}
        variables={{
          filter: filter,
          skip: page * perPage - perPage,
          first: perPage
        }}
      >
        {({ loading, error, data: { introComments } }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;

          return (
            <CommentList
              introComments={introComments}
              page={page}
              name={'Comments'}
            />
          );
        }}
      </Query>
    );
  }
}

export default IntroComments;
