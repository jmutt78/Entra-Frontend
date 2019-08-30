import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import AnswerList from "./index";
import answersListQuery from "./answerListQuery.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag'

const MY_ANSWERS_PAGINATION_QUERY = gql`
  query MY_ANSWERS_PAGINATION_QUERY($filter: String!) {
    answersConnection(filter: $filter) {
      aggregate {
        count
      }
    }
  }
`;

class MyAnswers extends Component {
  render() {
    const { page } = this.props;
    const filter = "my";
    return (
      <Query
        query={answersListQuery}
        variables={{
          filter,
          skip: page * perPage - perPage,
          first: perPage
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />
          if (error) return <p>Error</p>;
          const { answers } = data;

          return (
            <AnswerList
              answers={answers}
              page={page}
              paginationQuery={MY_ANSWERS_PAGINATION_QUERY}
              paginationVariables={{ filter }}
            />
          );
        }}
      </Query>
    );
  }
}

export default MyAnswers;
