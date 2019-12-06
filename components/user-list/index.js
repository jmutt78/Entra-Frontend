import React, { Component } from 'react';

import { Query } from 'react-apollo';

import QuestionList from '../question-list';
import userListQuery from './userListQuery.js';
import { USER_QUERY } from '../user-display';
import Error from './../ErrorMessage.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class UserList extends Component {
  render() {
    const filter = 'user';
    const { id } = this.props;

    return (
      <Query
        query={USER_QUERY}
        variables={{
          id
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const name = data.user.name;

          return (
            <Query
              query={userListQuery}
              variables={{
                id: this.props.id,
                filter,
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
                    name={name}
                    questions={questions}
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
        }}
      </Query>
    );
  }
}

export default UserList;
