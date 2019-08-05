import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import QuestionList from "../question-list";
import questionListQuery from "../question-list/questionListQuery";

class MyBookMark extends Component {
  render() {
    const filter = "My BookMarked";
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
        {({ data: { questions }, loading }) => {
          if (loading) return <p>Loading...</p>;

          return (
            <QuestionList questions={questions} filter={filter} page={page} />
          );
        }}
      </Query>
    );
  }
}

export default MyBookMark;