import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import AnswerForm from "./AnswerForm";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Error from "./../ErrorMessage.js";
import PropTypes from "prop-types";

const SINGLE_ANSWER_QUERY = gql`
  query SINGLE_ANSWER_QUERY($id: ID!) {
    answer(where: { id: $id }) {
      id
      body
      answeredTo {
        id
      }
    }
  }
`;

class UpdateAnswer extends Component {
  render() {
    return (
      <Query
        query={SINGLE_ANSWER_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data: { answer }, loading }) => {
          if (loading) return <p>Loading...</p>;

          return <AnswerForm answer={answer} />;
        }}
      </Query>
    );
  }
}

export default UpdateAnswer;
