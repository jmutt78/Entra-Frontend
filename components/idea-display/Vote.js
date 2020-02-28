import React, { useState } from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const VotesCount = styled.div`
  font-weight: 600px;
  font-size: 1rem;
`;

const Vote = ({ upvoteCb, downvoteCb, upVotes, downVotes }) => {
  const [hasVoted, setHasVoted] = useState(0);

  const vote = async dir => {
    if (dir === 'down') {
      setHasVoted(-1);

      return downvoteCb();
    }
    if (dir === 'up') {
      setHasVoted(1);

      return upvoteCb();
    }
  };

  return (
    <Container>
      <Tooltip title="vote up" placement="top" onClick={() => vote('up')}>
        <ArrowDropUpIcon
          style={hasVoted > 0 ? { color: '#e8a77f' } : {}}
          fontSize="large"
        />
      </Tooltip>
      <VotesCount
        style={
          hasVoted > 0
            ? { color: '#e8a77f' }
            : hasVoted < 0
            ? { color: '#85bdcb' }
            : {}
        }
      >
        {upVotes - downVotes}
      </VotesCount>
      <Tooltip title="vote down" placement="top" onClick={() => vote('down')}>
        <ArrowDropDownIcon
          style={hasVoted < 0 ? { color: '#85bdcb' } : {}}
          fontSize="large"
        />
      </Tooltip>
    </Container>
  );
};

export default Vote;
