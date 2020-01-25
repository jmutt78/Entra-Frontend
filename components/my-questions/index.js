import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { perPage } from '../../config.js';
import QuestionList from '../question-list';
import questionListQuery from '../question-list/questionListQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';

export const MY_QUESTIONS_PAGINATION_QUERY = gql`
  query MY_QUESTIONS_PAGINATION_QUERY($filter: String!) {
    questionsConnection(filter: $filter) {
      aggregate {
        count
      }
    }
  }
`;

class MyQuestions extends Component {
  render() {
    const filter = 'my';
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
        {({ loading, error, data }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <p>Error</p>;

          const { questions } = data;

          return (
            <QuestionList
              questions={questions}
              paginationQuery={MY_QUESTIONS_PAGINATION_QUERY}
              paginationVariables={{ filter }}
              page={page}
              name={'my questions'}
            />
          );
        }}
      </Query>
    );
  }
}

export default MyQuestions;
