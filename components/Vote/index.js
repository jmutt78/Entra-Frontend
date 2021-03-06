import React, { useState } from 'react';

import Tooltip from '@material-ui/core/Tooltip';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';

import questionQuery from '../question-display/questionQuery';
import Error from './../ErrorMessage';

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer'
  },
  votesCount: {
    fontWeight: 600,
    fontSize: '1rem'
  }
});

export const CREATE_QUESTION_VOTE_MUTATION = gql`
  mutation CREATE_QUESTION_VOTE_MUTATION($questionId: ID!, $vote: String) {
    createQuestionVote(questionId: $questionId, vote: $vote)
  }
`;

const Vote = ({ classes, client, id }) => {
  const [hasVoted, setHasVoted] = useState(0);

  const vote = async dir => {
    return client.mutate({
      mutation: CREATE_QUESTION_VOTE_MUTATION,
      variables: {
        questionId: id,
        vote: dir
      },
      refetchQueries: [{ query: questionQuery, variables: { id } }]
    });
  };

  const downVote = async () => {
    switch (hasVoted) {
      case 0:
        // can vote
        setHasVoted(-1);
        await vote('down');
        break;
      case 1:
        // cancel previous vote
        setHasVoted(-1);
        await vote('down');
        break;
      case -1:
        // already voted - should cancel vote, but not implemented in resolver
        break;
      default:
        break;
    }
  };

  const upVote = async () => {
    switch (hasVoted) {
      case 0:
        // can vote
        setHasVoted(1);
        await vote('up');
        break;
      case 1:
        // already voted - should cancel vote, but not implemented in resolver
        break;
      case -1:
        // cancel previous vote
        setHasVoted(1);
        await vote('up');
        break;
      default:
        break;
    }
  };

  return (
    <Query query={questionQuery} variables={{ id }}>
      {({ data, loading, error }) => {
        if (error) return <Error error={error} />;
        return (
          <div className={classes.container}>
            <Tooltip title="vote up" placement="top" onClick={upVote}>
              <ArrowDropUpIcon
                style={hasVoted > 0 ? { color: '#e8a77f' } : {}}
                fontSize="large"
              />
            </Tooltip>
            <div
              className={classes.votesCount}
              style={
                hasVoted > 0
                  ? { color: '#e8a77f' }
                  : hasVoted < 0
                  ? { color: '#85bdcb' }
                  : {}
              }
            >
              {data.question
                ? data.question.upVotes - data.question.downVotes
                : null}
            </div>
            <Tooltip title="vote down" placement="bottom" onClick={downVote}>
              <ArrowDropDownIcon
                style={hasVoted < 0 ? { color: '#85bdcb' } : {}}
                fontSize="large"
              />
            </Tooltip>
          </div>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(withApollo(Vote));
