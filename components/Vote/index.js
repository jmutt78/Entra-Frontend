import React, { useState } from 'react';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import Tooltip from '@material-ui/core/Tooltip';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';

import questionQuery from '../question-display/questionQuery';

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

  const downVote = async () => {
    if (hasVoted > -1) {
      setHasVoted(hasVoted - 1);
    } else {
      setHasVoted(0);
    }

    await client.mutate({
      mutation: CREATE_QUESTION_VOTE_MUTATION,
      variables: {
        questionId: id,
        vote: 'down'
      },
      refetchQueries: [{ query: questionQuery, variables: { id } }]
    });
  };

  const upVote = async () => {
    if (hasVoted < 1) {
      setHasVoted(hasVoted + 1);
    } else {
      setHasVoted(0);
    }

    await client.mutate({
      mutation: CREATE_QUESTION_VOTE_MUTATION,
      variables: {
        questionId: id,
        vote: 'up'
      },
      refetchQueries: [{ query: questionQuery, variables: { id } }]
    });
  };

  return (
    <Query query={questionQuery} variables={{ id }}>
      {({ data, loading, error }) => {
        return (
          <div className={classes.container}>
            <Tooltip
              title="vote up"
              placement="top"
              onClick={loading || upVote}
            >
              <UpIcon
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
              {data.question.upVotes - data.question.downVotes + hasVoted}
            </div>
            <Tooltip
              title="vote down"
              placement="top"
              onClick={loading || downVote}
            >
              <DownIcon
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
