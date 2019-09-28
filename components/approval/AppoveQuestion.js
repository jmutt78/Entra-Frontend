import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import questionQuery from '../question-display/questionQuery.js';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Error from './../ErrorMessage.js';

export const APPROVE_QUESTION_MUTATION = gql`
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

const styles = {
  buttonContainer: {
    display: 'inline',
    padding: '0 5px'
  },
  buttonReject: {
    backgroundColor: '#E27D60'
  },
  buttonAccept: {
    backgroundColor: '#85BDCB'
  }
};

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

    console.log('Updated!!');
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

    console.log('Updated!!');
  };

  render() {
    const { classes } = this.props;
    const hasPermissions = this.props.hasPermissions;
    const isApproved = this.props.isApproved;
    const approval = this.props.approval;

    if (!hasPermissions) {
      return <div />;
    }
    return (
      <Mutation
        mutation={APPROVE_QUESTION_MUTATION}
        variables={this.state}
        refetchQueries={[
          {
            query: questionQuery,
            variables: { id: this.props.id }
          }
        ]}
      >
        {(updateQuestion, { error, loading }) => {
          if (approval === null) {
            return (
              <>
                <Error error={error} />
                <div className={classes.buttonContainer}>
                  <Button
                    className={classes.buttonAccept}
                    variant="contained"
                    onClick={e => this.handleApproval(e, updateQuestion)}
                  >
                    Approve
                  </Button>
                </div>
                <div className={classes.buttonContainer}>
                  <Button
                    className={classes.buttonReject}
                    variant="contained"
                    onClick={e => this.handleReject(e, updateQuestion)}
                  >
                    Reject
                  </Button>
                </div>
              </>
            );
          } else if (!isApproved) {
            return (
              <>
                <div className={classes.buttonContainer}>
                  <Button
                    className={classes.buttonAccept}
                    variant="contained"
                    onClick={e => this.handleApproval(e, updateQuestion)}
                  >
                    Approve
                  </Button>
                </div>
              </>
            );
          }
          return (
            <>
              <div className={classes.buttonContainer}>
                <Button
                  className={classes.buttonReject}
                  variant="contained"
                  onClick={e => this.handleReject(e, updateQuestion)}
                >
                  Reject
                </Button>
              </div>
            </>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(ApproveQuestion);
