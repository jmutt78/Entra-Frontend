import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";

const APPROVE_ANSWER_MUTATION = gql`
  mutation updateAnswer($id: ID!, $approval: Boolean) {
    updateAnswer(id: $id, approval: $approval) {
      id
      body
      answeredTo {
        id
      }
      answeredBy {
        id
      }
    }
  }
`;

class ApproveAnswers extends Component {
  state = {
    id: this.props.id
  };

  handleApproval = async (e, updateAnswer) => {
    e.preventDefault();
    const res = await updateAnswer({
      variables: {
        id: this.props.id,
        approval: true,
        ...this.state
      }
    });

    console.log("Updated!!");
  };

  handleReject = async (e, updateAnswer) => {
    e.preventDefault();
    const res = await updateAnswer({
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
      <Mutation mutation={APPROVE_ANSWER_MUTATION} variables={this.state}>
        {(updateAnswer, { error, loading }) => {
          return (
            <div>
              <Button
                variant="contained"
                onClick={e => this.handleApproval(e, updateAnswer)}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                onClick={e => this.handleReject(e, updateAnswer)}
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

export default ApproveAnswers;
