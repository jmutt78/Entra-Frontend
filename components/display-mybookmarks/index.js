import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import TitleBar from '../header/TitleBar';
import { perPage } from '../../config.js';
import QuestionList from '../question-list';
import questionListQuery from '../question-list/questionListQuery';
import Error from './../ErrorMessage.js';
import { usePageContext } from '../layout';

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

const Questions = ({ page, classes }) => {
  const { searchScope, searchTerm, sortBy } = usePageContext();
  const filter = 'My BookMarked';

  const ALL_QUESTIONS_PAGINATION_QUERY = gql`
    query ALL_QUESTIONS_PAGINATION_QUERY(
      $filter: String!
      $searchScope: String
      $searchTerm: String
    ) {
      questionsConnection(
        filter: $filter
        searchScope: $searchScope
        searchTerm: $searchTerm
      ) {
        aggregate {
          count
        }
      }
    }
  `;

  return (
    <div className={classes.container}>
      <TitleBar title={'My Bookmarks'} sort={true} search={true} />
      <Query
        query={questionListQuery}
        variables={{
          filter,
          skip: page * perPage - perPage,
          first: perPage,
          searchScope,
          searchTerm,
          sortBy
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
              paginationVariables={{ filter, searchScope, searchTerm }}
              name={'my bookmarks'}
            />
          );
        }}
      </Query>
    </div>
  );
};

export default withStyles(styles)(Questions);
