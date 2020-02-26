import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';

import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Error from './../ErrorMessage.js';
import { INTRO_QUERY } from '../intro-post';

export const APPROVE_INTRO_MUTATION = gql`
  mutation updateIntro($id: ID!, $approval: Boolean) {
    updateIntro(id: $id, approval: $approval) {
      id
    }
  }
`;

const styles = {
  buttonContainer: {
    display: 'flex',
    float: 'right',
    padding: '0 5px'
  },
  buttonReject: {
    color: '#E27D60'
  },
  buttonAccept: {
    color: '#85BDCB'
  },
  buttonAccepted: {
    color: '#85BDCB'
  },
  buttonRejected: {
    color: '#E27D60'
  }
};

class ApproveIntro extends Component {
  state = {
    id: this.props.id
  };

  handleApproval = async (e, updateIntro) => {
    e.preventDefault();
    const res = await updateIntro({
      variables: {
        id: this.props.id,
        approval: true,
        ...this.state
      }
    });
  };

  handleReject = async (e, updateIntro) => {
    e.preventDefault();
    const res = await updateIntro({
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
        mutation={APPROVE_INTRO_MUTATION}
        variables={this.state}
        refetchQueries={[
          {
            query: INTRO_QUERY,
            variables: { id: this.props.id }
          }
        ]}
      >
        {(updateIntro, { error, loading }) => {
          if (approval === null) {
            return (
              <div style={{ display: 'inline' }}>
                <Error error={error} />
                <div className={classes.buttonContainer}>
                  <Button
                    className={classes.buttonAccepted}
                    size="small"
                    onClick={e => this.handleApproval(e, updateIntro)}
                  >
                    Approve
                  </Button>
                </div>
                <div className={classes.buttonContainer}>
                  <Button
                    size="small"
                    className={classes.buttonRejected}
                    onClick={e => this.handleReject(e, updateIntro)}
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
                    size="small"
                    className={classes.buttonAccept}
                    onClick={e => this.handleApproval(e, updateIntro)}
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
                  size="small"
                  className={classes.buttonReject}
                  onClick={e => this.handleReject(e, updateIntro)}
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

export default withStyles(styles)(ApproveIntro);
