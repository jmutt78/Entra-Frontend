import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import questionQuery from "../question-display/questionQuery.js";
import answersListQuery from "../answer-list/answerListQuery";
import { CURRENT_USER_QUERY } from "../auth/User";
import Error from "./../ErrorMessage.js";

export const DELETE_ANSWER_MUTATION = gql`
  mutation DELETE_ANSWER_MUTATION($id: ID!) {
    deleteAnswer(id: $id) {
      id
    }
  }
`;

const styles = ({ layout, palette, spacing }) => ({
  button: {
    backgroundColor: palette.primary.dark,
    marginLeft: 10
  }
});

class DeleteAnswer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Mutation
        mutation={DELETE_ANSWER_MUTATION}
        variables={{ id: this.props.id }}
        refetchQueries={[
          {
            query: questionQuery,
            variables: { id: this.props.questionId }
          },
          {
            query: CURRENT_USER_QUERY
          },
          {
            query: answersListQuery,
            variables: { filter: "my" }
          },
          {
            query: answersListQuery,
            variables: { filter: "approval" }
          }
        ]}
        update={this.update}
      >
        {(deleteAnswer, { error }) => (
          <>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={() => {
                if (confirm("Are you sure you want to delete this item?")) {
                  deleteAnswer();
                  console.log(this.props.questionId);
                }
              }}
            >
              DELETE
            </Button>
            <Error error={error} />
          </>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(DeleteAnswer);
