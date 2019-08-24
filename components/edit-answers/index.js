import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AnswerForm from "./AnswerForm";
import Error from "./../ErrorMessage.js";

export const SINGLE_ANSWER_QUERY = gql`
  query SINGLE_ANSWER_QUERY($id: ID!) {
    answer(id: $id) {
      id
      body
      approval
      answeredTo {
        id
      }
      answeredBy {
        id
      }
    }
  }
`;

class UpdateAnswer extends Component {
  render() {
    return (
      <Query query={SINGLE_ANSWER_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          const { answer } = data;
          return <AnswerForm answer={answer} />;
        }}
      </Query>
    );
  }
}

export default UpdateAnswer;
