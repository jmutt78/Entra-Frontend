import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import QuestionList from "../question-list";
import questionListQuery from "../question-list/questionListQuery";

class MyQuestions extends Component {
  render() {
    const filter = "my";
    const { page } = this.props;
    return (
      <Query
        query={questionListQuery}
        variables={{
          filter,
          skip: page * perPage - perPage,
          first: perPage
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;

          const { questions } = data;

          return (
            <QuestionList
              questions={questions}
              filter={filter}
              page={page}
              name={"my questions"}
            />
          );
        }}
      </Query>
    );
  }
}

export default MyQuestions;
