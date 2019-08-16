import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import AnswerList from "./index";
import answersListQuery from "./answerListQuery.js";

class MyAnswers extends Component {
  render() {
    const filter = "my";
    return (
      <Query
        query={answersListQuery}
        variables={{
          filter,
          skip: this.props.page * perPage - perPage,
          first: perPage
        }}
      >
        {({ data: { answers }, loading }) => {
          if (loading) return <p>Loading...</p>;
          return <AnswerList answers={answers} filter={filter} />;
        }}
      </Query>
    );
  }
}

export default MyAnswers;
