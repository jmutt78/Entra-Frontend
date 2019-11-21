import React from 'react';
import { Query } from 'react-apollo';
import { SEARCH_QUESTIONS_QUERY } from '../search/QuestionSearch';
import Error from './../ErrorMessage.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PageHeader from '../PageHeader';
import ListItem from '../ListItem';
import { QuestionListContainer } from '../../src/styledComponents';

const styles = ({ layout }) => ({
  noMargin: {
    margin: 0
  }
});

const SearchResultQuestions = ({ searchTerm, name, classes }) => {
  const SearchQuestionListItem = ({ title, questions, onLoadMore }) => {
    const handleScroll = ({ currentTarget }, onLoadMore) => {
      if (
        currentTarget.scrollTop + currentTarget.clientHeight >=
        currentTarget.scrollHeight
      ) {
        onLoadMore();
      }
    };

    return (
      <QuestionListContainer>
        <PageHeader
          styles={classes.noMargin}
          title={title}
          noCapitalize={true}
        />
        <ul onScroll={e => handleScroll(e, onLoadMore)}>
          {questions &&
            questions.map(question => {
              return (
                <ListItem
                  item={question}
                  user={question.askedBy[0]}
                  userId={question.askedBy[0].id}
                  linkTo={{
                    pathname: '/question',
                    query: { id: question.id }
                  }}
                  showDetails={true}
                  name={name}
                  key={question.id}
                  display={question.askedBy[0].display}
                />
              );
            })}
        </ul>
      </QuestionListContainer>
    );
  };

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
          <SearchQuestionListItem
            title={`Search Results: ${searchTerm}`}
            questions={searchQuestions}
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
