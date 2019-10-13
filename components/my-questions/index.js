import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import { perPage } from '../../config.js';
import TitleBar from '../header/TitleBar';
import QuestionList from '../question-list';
import questionListQuery from '../question-list/questionListQuery';

export const MY_QUESTIONS_PAGINATION_QUERY = gql`
  query MY_QUESTIONS_PAGINATION_QUERY($filter: String!) {
    questionsConnection(filter: $filter) {
      aggregate {
        count
      }
    }
  }
`;

const styles = ({ layout }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 1200,
    minWidth: '90%',
    height: '100%',
    paddingRight: 10
  }
});

const MyQuestions = ({ page, classes }) => {
  const filter = 'my';
  return (
    <div className={classes.container}>
      <TitleBar title={'My Questions'} sort={true} search={true} />
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
    </div>
  );
};

export default withStyles(styles)(MyQuestions);
