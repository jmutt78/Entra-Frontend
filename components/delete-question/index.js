import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import questionListQuery from "../question-list/questionListQuery";

const DELETE_QUESTION_MUTATION = gql`
  mutation DELETE_QUESTION_MUTATION($id: ID!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`;

class DeleteQuestion extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: questionListQuery });
    console.log(data, payload);
    // 2. Filter the deleted item out of the page
    data.questions = data.questions.filter(
      question => question.id !== payload.data.deleteItem.id
    );
    // 3. Put the items back!
    cache.writeQuery({ query: questionListQuery, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_QUESTION_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteQuestion, { error }) => (
          <Button
            onClick={() => {
              if (confirm("Are you sure you want to delete this item?")) {
                deleteQuestion();
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

export default DeleteQuestion;
