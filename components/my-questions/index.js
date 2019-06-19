import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import QuestionList from "../question-list";
import questionListQuery from "../question-list/questionListQuery";

class MyQuestions extends Component {
  render() {
    const filter = "my";
    return (
      <Query
        query={questionListQuery}
        fetchPolicy="network-only"
        variables={{
          filter,
          skip: this.props.page * perPage - perPage,
          first: perPage
        }}
      >
        {({ data: { questions }, loading }) => {
          console.log(questions);
          if (loading) return <p>Loading...</p>;
          return <QuestionList questions={questions} filter={filter} />;
        }}
      </Query>
    );
  }
}

export default MyQuestions;
