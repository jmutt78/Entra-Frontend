import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { perPage } from '../../config.js';
import IdeaList from './IdeaList';
import Error from '../ErrorMessage';

import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';

const BUSINESSIDEAS_LIST_QUERY = gql`
  query BUSINESSIDEAS_LIST_QUERY($filter: String!, $skip: Int = 0, $first: Int = ${perPage}) {
    businessIdeas(filter: $filter, first: $first, skip: $skip, orderBy: createdAt_DESC) {
    id
    idea
    problem
    solution
    customer
    value
    createdBy {
      id
      name
      display
    }
createdAt
  }
}
`;

class AllIdeas extends Component {
  render() {
    const filter = 'public';
    const { page } = this.props;
    return (
      <Query
        query={BUSINESSIDEAS_LIST_QUERY}
        variables={{
          filter,
          skip: page * perPage - perPage,
          first: perPage
        }}
      >
        {({ loading, error, data: { businessIdeas } }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;

          return (
            <IdeaList
              businessIdeas={businessIdeas}
              page={page}
              name={'Community Business Ideas'}
            />
          );
        }}
      </Query>
    );
  }
}

export default AllIdeas;
