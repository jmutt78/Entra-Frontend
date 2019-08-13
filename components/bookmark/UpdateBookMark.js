import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import questionQuery from "../question-display/questionQuery.js";
import questionListQuery from "../question-list/questionListQuery";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import Bookmark from "@material-ui/icons/Bookmark";
import { CURRENT_USER_QUERY } from "../auth/User";

const DELETE_BOOKMARK_MUTATION = gql`
  mutation DELETE_BOOKMARK_MUTATION($id: ID!) {
    deleteBookMark(id: $id) {
      id
    }
  }
`;

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  buttonReject: {
    backgroundColor: "#E27D60",
    marginTop: 10
  },
  buttonAccept: {
    backgroundColor: "#85BDCB",
    marginTop: 10
  },
  buttonAccepted: {
    backgroundColor: "#85BDCB",
    marginTop: 10,
    marginRight: 10
  },
  buttonRejected: {
    backgroundColor: "#E27D60",
    marginTop: 10
  },
  icon: {
    fontSize: 30,
    cursor: "pointer",
    marginLeft: 20,
    marginTop: 10,
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
          </div>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(DeleteBookMark);
