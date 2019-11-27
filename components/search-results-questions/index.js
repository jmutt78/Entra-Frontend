import React from 'react';
import { Query } from 'react-apollo';
import { SEARCH_QUESTIONS_QUERY } from '../search/QuestionSearch';
import Error from './../ErrorMessage.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import QuestionList from '../question-list';

const styles = ({ layout }) => ({
  noMargin: {
    margin: 0
  }
});

const SearchResultQuestions = ({ searchTerm, name, classes }) => {
  return (
    <Query
      query={SEARCH_QUESTIONS_QUERY}
      variables={{
        searchTerm: searchTerm,
        noDuplicates: true
      }}
    >
      {({ data: { searchQuestions }, loading, error, fetchMore }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        return (
          <QuestionList
            name={`Search Results: ${searchTerm}`}
            questions={searchQuestions}
            headerStyle={classes.noMargin}
            onLoadMore={() =>
              fetchMore({
                variables: {
                  offset: searchQuestions.length,
                  noDuplicates: true
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    searchQuestions: [
                      ...prev.searchQuestions,
                      ...fetchMoreResult.searchQuestions
                    ]
                  });
                }
              })
            }
          />
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(SearchResultQuestions);
