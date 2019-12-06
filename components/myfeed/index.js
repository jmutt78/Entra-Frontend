import React, { Component } from 'react';
import { Query } from 'react-apollo';

import QuestionList from '../question-list';
import myFeedListQuery from './myFeedListQuery';
import { CURRENT_USER_QUERY } from '../auth/User';
import Error from './../ErrorMessage.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class MyFeed extends Component {
  render() {
    const filter = 'tagslist';
    const type = 'search';
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error, fetchMore }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const id = data.me.tags.map(({ id }) => id);

          return (
            <Query
              query={myFeedListQuery}
              variables={{
                id,
                filter,
                offset: 0,
                limit: 10
              }}
            >
              {({ data: { questions }, loading, error, fetchMore }) => {
                if (loading) return <CircularProgress style={{ margin: 20 }} />;
                if (error) return <Error error={error} />;

                return (
                  <QuestionList
                    name={'My Feed'}
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
        }}
      </Query>
    );
  }
}

export default MyFeed;
