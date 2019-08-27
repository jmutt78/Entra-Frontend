import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import AnswerList from "../answer-list";
import userAnswerQuery from "./answerListQuery.js";
import Error from "./../ErrorMessage.js";
import CircularProgress from '@material-ui/core/CircularProgress';

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
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{margin: 20}} />
          if (error) return <Error error={error} />;
          const { answers } = data;
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
