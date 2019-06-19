import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import QuestionList from "../question-list";
import questionListQuery from "../question-list/questionListQuery";

class Questions extends Component {
  render() {
    const filter = "all";
    return (
      <Query
        query={questionListQuery}
        fetchPolicy="network-only"
        variables={{
          skip: this.props.page * perPage - perPage,
          first: perPage,
          filter
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

export default Questions;
