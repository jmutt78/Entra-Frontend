import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import AnswerList from "./index";
import answersListQuery from "./answerListQuery";

class AprrovalAnswers extends Component {
  render() {
    const filter = "approval";
    return (
      <Query
        query={answersListQuery}
        fetchPolicy="network-only"
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

export default AprrovalAnswers;
