import React from "react";
import { Mutation } from "react-apollo";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import { useRouter } from "next/router";

const DELETE_QUESTION_MUTATION = gql`
  mutation DELETE_QUESTION_MUTATION($id: ID!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`;

function DeleteQuestion(props) {
  const router = useRouter();
  function handleDelete(deleteQuestion) {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteQuestion().then(() => router.push("/myquestions"));
    }
  }
  return (
    <Mutation mutation={DELETE_QUESTION_MUTATION} variables={{ id: props.id }}>
      {(deleteQuestion, { error }) => (
        <div>
          <Button onClick={() => handleDelete(deleteQuestion)}>
            {" "}
            Delete
            {props.children}
          </Button>
          <div style={{ color: "red" }}>
            {error && error.message.replace("GraphQL error: ", "")}
          </div>
        </div>
      )}
    </Mutation>
  );
}

export default DeleteQuestion;
