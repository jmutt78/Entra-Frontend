import React from 'react';
import { Query } from 'react-apollo';
import { SEARCH_QUESTIONS_QUERY } from '../search/QuestionSearch';
import Error from './../ErrorMessage.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PageHeader from '../PageHeader';
import ListItem from '../ListItem';

const styles = ({ layout }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 1200,
    minWidth: '90%',
    height: '100%',
    paddingRight: 10
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  icon: {
    color: 'black'
  },
  customColumnStyle: {
    maxWidth: '.3px'
  },
  searchQuestions: {
    height: '47vh',
    width: '100%',
    overflow: 'auto'
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
      <div className={classes.container}>
        <PageHeader title={title} noCapitalize={true} />
        <ul
          className={classes.searchQuestions}
          onScroll={e => handleScroll(e, onLoadMore)}
        >
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
      </div>
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
            title={`All search results for: ${searchTerm}`}
            questions={searchQuestions}
            onLoadMore={() =>
              fetchMore({
                variables: {
                  offset: searchQuestions.length || 10,
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
