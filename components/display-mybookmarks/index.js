import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { perPage } from '../../config.js';
import QuestionList from '../question-list';
import questionListQuery from '../question-list/questionListQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';

export const MY_BOOKMARK_QUESTIONS_PAGINATION_QUERY = gql`
  query MY_BOOKMARK_QUESTIONS_PAGINATION_QUERY($filter: String!) {
    questionsConnection(filter: $filter) {
      aggregate {
        count
      }
    }
  }
`;

class MyBookMark extends Component {
  render() {
    const filter = 'My BookMarked';
    const { page } = this.props;
    return (
      <Query
        query={questionListQuery}
        variables={{
          filter,
          skip: page * perPage - perPage,
          first: perPage
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <p>Error</p>;
          const { questions } = data;

          return (
            <QuestionList
              enablePagination={true}
              questions={questions}
              paginationQuery={MY_BOOKMARK_QUESTIONS_PAGINATION_QUERY}
              paginationVariables={{ filter }}
              page={page}
              name={'my bookmarks'}
            />
          );
        }}
      </Query>
    );
  }
}

export default MyBookMark;
