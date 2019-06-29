import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";

const APPROVE_QUESTION_MUTATION = gql`
  mutation updateQuestion($id: ID!, $approval: Boolean) {
    updateQuestion(
      id: $id

      approval: $approval
    ) {
      id
      title
      tags {
        id
        name
      }
      id
    }
  }
`;

class ApproveQuestion extends Component {
  state = {
    id: this.props.id
  };

  handleApproval = async (e, updateQuestion) => {
    e.preventDefault();
    const res = await updateQuestion({
      variables: {
        id: this.props.id,
        approval: true,
        ...this.state
      }
    });

    console.log("Updated!!");
  };

  handleReject = async (e, updateQuestion) => {
    e.preventDefault();
    const res = await updateQuestion({
      variables: {
        id: this.props.id,
        approval: false,
        ...this.state
      }
    });

    console.log("Updated!!");
  };

  render() {
    console.log(this.props);
    console.log(this.state);
    const hasPermissions = this.props.hasPermissions;
    const isApproved = this.props.isApproved;
    if (!hasPermissions) {
      return <div />;
    }
    return (
      <Mutation mutation={APPROVE_QUESTION_MUTATION} variables={this.state}>
        {(updateQuestion, { error, loading }) => {
          return (
            <div>
              <Button
                variant="contained"
                onClick={e => this.handleApproval(e, updateQuestion)}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                onClick={e => this.handleReject(e, updateQuestion)}
              >
                Reject
              </Button>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default ApproveQuestion;
