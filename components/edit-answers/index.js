import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AnswerForm from "./AnswerForm";

const SINGLE_ANSWER_QUERY = gql`
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
        {({ data: { answer }, loading }) => {
          if (loading) return <p>Loading...</p>;

          return <AnswerForm answer={answer} />;
        }}
      </Query>
    );
  }
}

export default UpdateAnswer;
export { SINGLE_ANSWER_QUERY };
