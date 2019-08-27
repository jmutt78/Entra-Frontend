import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import AnswerList from "../answer-list";
import userAnswerQuery from "./answerListQuery.js";
import Error from "./../ErrorMessage.js";
import CircularProgress from '@material-ui/core/CircularProgress';

class UserAnswers extends Component {
  handleName(answers) {
    if (answers[0] === undefined) {
      return "";
    } else {
      return answers[0].answeredBy.name;
    }
  }
  render() {
    const filter = "user";
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
        {({ data: { answers }, loading, error }) => {
          if (loading) return <CircularProgress style={{margin: 20}} />
          if (error) return <Error error={error} />;
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

export default UserAnswers;
