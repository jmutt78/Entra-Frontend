import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import QuestionForm from "./QuestionForm";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Error from "./../ErrorMessage.js";
import PropTypes from "prop-types";

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
