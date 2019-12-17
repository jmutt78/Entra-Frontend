import React, { Component } from 'react';
import { Query } from 'react-apollo';
import QuestionList from '../question-list';
import questionListQuery from '../question-list/questionListQuery';
import Error from './../ErrorMessage.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class Questions extends Component {
  render() {
    const filter = 'all';
    const type = 'search';
    return (
      <Query
        query={questionListQuery}
        variables={{
          filter: filter,
          offset: 0,
          limit: 10
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const { questions } = data;

          return (
            <QuestionList
              name={'Latest questions'}
              questions={questions}
              type={type}
              onLoadMore={() =>
                fetchMore({
                  variables: {
                    offset: questions.length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      questions: [
                        ...prev.questions,
                        ...fetchMoreResult.questions
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
  }
}

export default Questions;
