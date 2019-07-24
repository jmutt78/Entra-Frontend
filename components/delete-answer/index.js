import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import questionQuery from "../question-display/questionQuery.js";

const DELETE_ANSWER_MUTATION = gql`
  mutation DELETE_ANSWER_MUTATION($id: ID!) {
    deleteAnswer(id: $id) {
      id
    }
  }
`;

class DeleteAnswer extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_ANSWER_MUTATION}
        variables={{ id: this.props.id }}
        refetchQueries={[
          {
            query: questionQuery,
            variables: { id: this.props.questionId }
          }
        ]}
        update={this.update}
      >
        {(deleteAnswer, { error }) => (
          <Button
            onClick={() => {
              if (confirm("Are you sure you want to delete this item?")) {
                deleteAnswer();
              }
            }}
          >
            {" "}
            Delete
            {this.props.children}
          </Button>
        )}
      </Mutation>
    );
  }
}

export default DeleteAnswer;
