import React, { Component } from "react";
import { Query } from "react-apollo";
import QuestionForm from "./QuestionForm";

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
        {({ data: { question }, loading }) => {
          if (loading) return <p>Loading...</p>;
          return <QuestionForm question={question} />;
        }}
      </Query>
    );
  }
}

export default UpdateQuestion;
