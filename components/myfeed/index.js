import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { perPage } from '../../config.js';
import QuestionList from '../question-list';
import myFeedListQuery from './myFeedListQuery';
import { CURRENT_USER_QUERY } from '../auth/User';
import Error from './../ErrorMessage.js';
import CircularProgress from '@material-ui/core/CircularProgress';

export const TAGSFEED_QUESTIONS_PAGINATION_QUERY = gql`
  query TAGSFEED_QUESTIONS_PAGINATION_QUERY($id: [ID!], $filter: String!) {
    questionsConnection(where: { tags_some: { id_in: $id } }, filter: $filter) {
      aggregate {
        count
      }
    }
  }
`;

class MyFeed extends Component {
  render() {
    const filter = 'tagslist';
    const { page } = this.props;

    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const id = data.me.tags.map(({ id }) => id);

          return (
            <Query
              query={myFeedListQuery}
              variables={{
                id,
                filter,
                skip: page * perPage - perPage,
                first: perPage
              }}
            >
              {({ data: { questions }, loading, error }) => {
                if (loading) return <CircularProgress style={{ margin: 20 }} />;
                if (error) return <Error error={error} />;

                return (
                  <QuestionList
                    enablePagination={true}
                    questions={questions}
                    paginationVariables={{ filter, id }}
                    page={page}
                    name={'My Feed'}
                    paginationQuery={TAGSFEED_QUESTIONS_PAGINATION_QUERY}
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

export default withApollo(MyFeed);
