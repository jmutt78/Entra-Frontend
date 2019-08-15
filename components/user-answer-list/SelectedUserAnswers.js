import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import AnswerList from "../answer-list";
import userAnswerQuery from "./answerListQuery.js";

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
    return (
      <Query
        query={userAnswerQuery}
        variables={{
          id: this.props.id,
          filter,
          skip: this.props.page * perPage - perPage,
          first: perPage
        }}
      >
        {({ data: { answers }, loading }) => {
          if (loading) return <p>Loading...</p>;
          console.log(answers);
          return (
            <AnswerList
              answers={answers}
              filter={filter}
              name={this.handleName(answers)}
            />
          );
        }}
      </Query>
    );
  }
}

export default SelectedUserAnswers;
