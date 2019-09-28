import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import questionQuery from '../question-display/questionQuery.js';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Error from './../ErrorMessage.js';
import answersListQuery from '../answer-list/answerListQuery';

export const APPROVE_ANSWER_MUTATION = gql`
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
  },
  buttonAccepted: {
    backgroundColor: '#85BDCB'
  },
  buttonRejected: {
    backgroundColor: '#E27D60'
  }
};

class ApproveAnswer extends Component {
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
  };

  render() {
    const { classes } = this.props;
    const hasPermissions = this.props.hasPermissions;
    const isApproved = this.props.isApproved;
    const approval = this.props.approval;

    if (!hasPermissions) {
      return null;
    }

    return (
      <Mutation
        mutation={APPROVE_ANSWER_MUTATION}
        variables={this.state}
        refetchQueries={[
          {
            query: questionQuery,
            variables: { id: this.props.questionId }
          },
          {
            query: answersListQuery,
            variables: { filter: 'approval' }
          }
        ]}
      >
        {(updateAnswer, { error, loading }) => {
          if (approval === null) {
            return (
              <div style={{ display: 'inline' }}>
                <Error error={error} />
                <div className={classes.buttonContainer}>
                  <Button
                    className={classes.buttonAccepted}
                    variant="contained"
                    onClick={e => this.handleApproval(e, updateAnswer)}
                  >
                    Approve
                  </Button>
                </div>
                <div className={classes.buttonContainer}>
                  <Button
                    className={classes.buttonRejected}
                    variant="contained"
                    onClick={e => this.handleReject(e, updateAnswer)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            );
          } else if (!isApproved) {
            return (
              <div style={{ display: 'inline' }}>
                <div className={classes.buttonContainer}>
                  <Button
                    className={classes.buttonAccept}
                    variant="contained"
                    onClick={e => this.handleApproval(e, updateAnswer)}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            );
          }
          return (
            <div style={{ display: 'inline' }}>
              <div className={classes.buttonContainer}>
                <Button
                  className={classes.buttonReject}
                  variant="contained"
                  onClick={e => this.handleReject(e, updateAnswer)}
                >
                  Reject
                </Button>
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(ApproveAnswer);
