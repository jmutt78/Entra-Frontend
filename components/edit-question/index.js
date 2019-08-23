import React, { Component } from "react";
import { Query } from "react-apollo";
import QuestionForm from "./QuestionForm";
import Error from "./../ErrorMessage.js";

import questionQuery from "../question-display/questionQuery";

class UpdateQuestion extends Component {
  render() {
    return (
      <Query
        query={questionQuery}
        variables={{
          id: this.props.id
        }}
      >
        {({ data: { question }, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          return <QuestionForm question={question} />;
        }}
      </Query>
    );
  }
}

export default UpdateQuestion;
