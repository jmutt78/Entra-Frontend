import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import QuestionList from "../question-list";
import questionListQuery from "../question-list/questionListQuery";

class AprrovalQuestions extends Component {
  render() {
    const filter = "approval";
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
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
          const { questions } = data;

          return <QuestionList questions={questions} filter={filter} />;
        }}
      </Query>
    );
  }
}

export default AprrovalQuestions;
