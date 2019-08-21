import React from "react";
import { Mutation } from "react-apollo";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import questionListQuery from "../question-list/questionListQuery";
import Error from "./../ErrorMessage.js";
import { useRouter } from "next/router";
import { withStyles } from "@material-ui/core/styles";

const styles = ({ layout, palette, spacing }) => ({
  button: {
    backgroundColor: palette.primary.dark,
    marginLeft: 10
  }
});

const DELETE_QUESTION_MUTATION = gql`
  mutation DELETE_QUESTION_MUTATION($id: ID!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`;

const DeleteQuestion = ({ id, classes }) => {
  const router = useRouter();
  function handleDelete(deleteQuestion) {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteQuestion().then(() => router.push("/myquestions"));
    }
  }
  return (
    <Mutation
      mutation={DELETE_QUESTION_MUTATION}
      variables={{ id: id }}
      refetchQueries={[
        {
          query: questionListQuery,
          variables: { filter: ["my", "all"] }
        }
      ]}
    >
      {(deleteQuestion, { error }) => (
        <>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(deleteQuestion)}
          >
            DELETE
          </Button>
          <Error error={error} />
        </>
      )}
    </Mutation>
  );
};

export default withStyles(styles)(DeleteQuestion);
