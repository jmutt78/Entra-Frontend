import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { perPage } from '../../config.js';
import QuestionList from '../question-list';
import userListQuery from './userListQuery.js';
import { USER_QUERY } from '../user-display';
import Error from './../ErrorMessage.js';
import CircularProgress from '@material-ui/core/CircularProgress';

export const USER_QUESTIONS_PAGINATION_QUERY = gql`
  query USER_QUESTIONS_PAGINATION_QUERY(id: $ID!, $filter: String!) {
    questionsConnection(where: {askedBy_some: {id: $id}}, filter: $filter) {
      aggregate {
        count
      }
    }
  }
`;

class UserList extends Component {
  render() {
    const filter = 'user';
    const { page, id } = this.props;

    return (
      <Query
        query={USER_QUERY}
        variables={{
          id,
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const name = data.user.name;

          return (
            <Query
              query={userListQuery}
              variables={{
                id: this.props.id,
                filter,
                skip: page * perPage - perPage,
                first: perPage,
              }}
            >
              {({ data, loading, error }) => {
                if (loading) return <CircularProgress style={{ margin: 20 }} />;
                if (error) return <Error error={error} />;
                const { questions } = data;

                return (
                  <QuestionList
                    questions={questions}
                    paginationQuery={USER_QUESTIONS_PAGINATION_QUERY}
                    paginationVariables={{ filter, id }}
                    page={page}
                    name={name}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default withApollo(UserList);
