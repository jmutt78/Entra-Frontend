import React, { Component } from "react";
import { Query } from "react-apollo";
import QuestionForm from "./QuestionForm";
import Error from "./../ErrorMessage.js";

import CircularProgress from '@material-ui/core/CircularProgress';
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
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{margin: 20}} />
          if (error) return <Error error={error} />;
          const { question } = data;

          return <QuestionForm question={question} />;
        }}
      </Query>
    );
  }
}

export default UpdateQuestion;
