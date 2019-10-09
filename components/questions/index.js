import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import CircularProgress from '@material-ui/core/CircularProgress';

import { perPage } from '../../config.js';
import QuestionList from '../question-list';
import questionListQuery from '../question-list/questionListQuery';
import Error from './../ErrorMessage.js';
import { usePageContext } from '../layout';

export const ALL_QUESTIONS_PAGINATION_QUERY = gql`
  query ALL_QUESTIONS_PAGINATION_QUERY($filter: String!) {
    questionsConnection(filter: $filter) {
      aggregate {
        count
      }
    }
  }
`;

const Questions = ({ page }) => {
  const { searchScope, searchTerm } = usePageContext();
  const filter = 'all';

  return (
    <Query
      query={questionListQuery}
      variables={{
        filter,
        skip: page * perPage - perPage,
        first: perPage,
        searchScope,
        searchTerm
      }}
    >
      {({ data, loading, error }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        const { questions } = data;
        return (
          <QuestionList
            questions={questions}
            page={page}
            paginationQuery={ALL_QUESTIONS_PAGINATION_QUERY}
            paginationVariables={{ filter }}
            name={'all questions'}
          />
        );
      }}
    </Query>
  );
};

export default Questions;
