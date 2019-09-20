import React from 'react';
import { Query } from 'react-apollo';
import QuestionList from '../../components/question-list';
import Error from '../../components/ErrorMessage';
import CircularProgress from '@material-ui/core/CircularProgress';
//import query from "./query";
import gql from 'graphql-tag';
var query = gql`
  query QUESTION_LIST_QUERY {
    questions(filter: "all", first: 5) {
      id
      title
      description
      createdAt

      approval
      answers {
        id
        body
      }
      tags {
        id
        name
      }
      views
      upVotes
      downVotes
      askedBy {
        id
        name
        display
      }
      bookMark {
        id
      }
    }
  }
`;

const styles = {
  container: {
    padding: '40px 20px 80px 20px',
    maxWidth: 1000,
    alignSelf: 'center',
    justifySelf: 'center',
    textAlign: 'center',
    margin: '0 auto',
    // TEMP
    overflowX: 'hidden'
  }
};

export default () => (
  <Query query={query}>
    {({ data, loading, error }) => {
      if (loading) return <CircularProgress style={{ margin: 20 }} />;
      if (error) return <Error error={error} />;
      return (
        <div style={styles.container}>
          <QuestionList
            enablePagination={false}
            questions={data.questions}
            filter={'all'}
            page="1"
            name={'Latest Questions'}
          />
        </div>
      );
    }}
  </Query>
);
