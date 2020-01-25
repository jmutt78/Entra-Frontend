import React, { Component } from 'react';
import { Query } from 'react-apollo';

import QuestionList from '../question-list';
import questionListQuery from '../question-list/questionListQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import { questoinsPerScroll } from '../../config';
import Error from './../ErrorMessage.js';

class MyQuestions extends Component {
  state = {
    hasMoreQuestions: true
  };

  stopLoading = () => {
    this.setState({ hasMoreQuestions: false });
  };

  render() {
    const filter = 'my';
    const type = 'search';
    const { page } = this.props;
    return (
      <Query
        query={questionListQuery}
        variables={{
          filter,
          offset: 0,
          limit: questoinsPerScroll
        }}
      >
        {({ data: { questions }, loading, error, fetchMore }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;

          return (
            <QuestionList
              name={'my questions'}
              questions={questions}
              type={type}
              hasMoreQuestions={this.state.hasMoreQuestions}
              onLoadMore={() =>
                fetchMore({
                  variables: {
                    offset: questions.length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    if (fetchMoreResult.questions.length === 0) {
                      this.stopLoading();
                    }
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

export default MyQuestions;
