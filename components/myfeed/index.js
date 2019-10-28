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

export const TAGS_QUESTIONS_PAGINATION_QUERY = gql`
  query TAGS_QUESTIONS_PAGINATION_QUERY($id: ID!, $filter: String!) {
    questionsConnection(where: { tags_some: { id: $id } }, filter: $filter) {
      aggregate {
        count
      }
    }
  }
`;

// TODO:
//1. add pagination

class MyFeed extends Component {
  render() {
    const filter = 'tagslist';
    const { page } = this.props;

    //const name = data.tag.name;
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
          const id = data.me.tags.map(({ id }) => id);
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
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
                console.log(questions);
                return (
                  <div>
                    {' '}
                    {
                      <QuestionList
                        enablePagination={false}
                        questions={questions}
                        paginationQuery={TAGS_QUESTIONS_PAGINATION_QUERY}
                        paginationVariables={{ filter, id }}
                        page={page}
                        name={'My Feed'}
                      />
                    }
                  </div>
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
