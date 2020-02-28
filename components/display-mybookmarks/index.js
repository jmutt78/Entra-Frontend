import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { perPage } from '../../config.js';
import { questoinsPerScroll } from '../../config';
import QuestionList from '../question-list';
import questionListQuery from '../question-list/questionListQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import Error from './../ErrorMessage.js';
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
  state = {
    hasMoreQuestions: true
  };

  stopLoading = () => {
    this.setState({ hasMoreQuestions: false });
  };

  render() {
    const filter = 'My BookMarked';
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
        {({ data, loading, error, fetchMore }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const { questions } = data;

          return (
            <QuestionList
              questions={questions}
              paginationVariables={{ filter }}
              name={'my bookmarks'}
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

export default MyBookMark;
