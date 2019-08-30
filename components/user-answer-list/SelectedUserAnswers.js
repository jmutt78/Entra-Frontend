import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import AnswerList from "../answer-list";
import userAnswerQuery from "./answerListQuery.js";
import Error from "./../ErrorMessage.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import gql from 'graphql-tag'

const SELECTED_ANSWERS_PAGINATION_QUERY = gql`
  query SELECTED_ANSWERS_PAGINATION_QUERY($id: ID!, $filter: String!) {
    answersConnection(where: {answeredBy: {id: $id}}, filter: $filter) {
      aggregate {
        count
      }
    }
  }
`;

class SelectedUserAnswers extends Component {
  handleName(answers) {
    if (answers[0] === undefined) {
      return "";
    } else {
      return answers[0].answeredBy.name;
    }
  }
  render() {
    const filter = "selected";
    const { page, id } = this.props;
    return (
      <Query
        query={userAnswerQuery}
        variables={{
          id,
          filter,
          skip: page * perPage - perPage,
          first: perPage
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const { answers } = data;
          return (
            <AnswerList
              answers={answers}
              name={this.handleName(answers)}
              page={page}
              paginationQuery={SELECTED_ANSWERS_PAGINATION_QUERY}
              paginationVariables={{ filter, id }}
            />
          );
        }}
      </Query>
    );
  }
}

export default SelectedUserAnswers;
