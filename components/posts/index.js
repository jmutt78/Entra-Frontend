import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { perPage } from '../../config.js';
import PostList from './PostList';
import Error from './../ErrorMessage.js';

import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';

export const INTROS_QUERY = gql`
  query INTROS_QUERY($filter: String!, $skip: Int = 0, $first: Int = ${perPage}) {
    introes(filter: $filter, first: $first, skip: $skip, orderBy: createdAt_DESC) {
    about
    approval
    challenges
    createdAt
    id
    introduction
    postedBy {
      id
      display
      name
      image
    }
  }
}
`;

class Posts extends Component {
  render() {
    const filter = 'all';
    const { page } = this.props;
    return (
      <Query
        query={INTROS_QUERY}
        variables={{
          filter: filter,
          skip: page * perPage - perPage,
          first: perPage
        }}
      >
        {({ loading, error, data: { introes } }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;

          return (
            <PostList introes={introes} page={page} name={'Introductions'} />
          );
        }}
      </Query>
    );
  }
}

export default Posts;
