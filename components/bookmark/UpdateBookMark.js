import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import questionListQuery from "../question-list/questionListQuery";
import Error from "./../ErrorMessage.js";
import gql from "graphql-tag";
import Bookmark from "@material-ui/icons/Bookmark";
import { CURRENT_USER_QUERY } from "../auth/User";

export const DELETE_BOOKMARK_MUTATION = gql`
  mutation DELETE_BOOKMARK_MUTATION($id: ID!) {
    deleteBookMark(id: $id) {
      id
    }
  }
`;

const styles = {
  icon: {
    fontSize: 30,
    cursor: "pointer",
    color: "#E27D60"
  }
};

class DeleteBookMark extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Mutation
        mutation={DELETE_BOOKMARK_MUTATION}
        variables={{ id: this.props.id[0] }}
        refetchQueries={[
          {
            query: questionListQuery,
            variables: { filter: "My BookMarked" }
          },
          { query: CURRENT_USER_QUERY }
        ]}
      >
        {(deleteBookMark, { error }) => (
          <div>
            <Bookmark
              className={classes.icon}
              onClick={() => {
                deleteBookMark();
              }}
            >
              Mark
            </Bookmark>
            <Error error={error} />
          </div>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(DeleteBookMark);
