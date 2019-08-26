import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import QuestionList from "../question-list";
import questionListQuery from "../question-list/questionListQuery";
import Error from "./../ErrorMessage.js";

class Questions extends Component {
  render() {
    const filter = "all";
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
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          const { questions } = data;
          return (
            <QuestionList
              questions={questions}
              filter={filter}
              page={page}
              name={"all questions"}
            />
          );
        }}
      </Query>
    );
  }
}

export default Questions;
