import React, { useState } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

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

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 74px;
  width: 64px;
  margin-top: 10px;
  border: 1.5px solid #e8e8e8;
  cursor: pointer;
`;

const VoteCount = styled.span`
  font-weight: 600;
  font-size: 1rem;
`;

const Welcome = ({ classes, upvoteCb, upVotes }) => {
  const [hasVoted, setHasVoted] = useState(0);

  const vote = async dir => {
    if (dir === 'up') {
      setHasVoted(1);

      return upvoteCb();
    }
  };

  return (
    <Root>
      <Tooltip
        title="Welcome to our community!"
        placement="top"
        onClick={() => vote('up')}
      >
        <ArrowDropUpIcon
          style={hasVoted > 0 ? { color: '#e8a77f' } : {}}
          fontSize="large"
        />
      </Tooltip>
      <VoteCount
        style={
          hasVoted > 0
            ? { color: '#e8a77f' }
            : hasVoted < 0
            ? { color: '#85bdcb' }
            : {}
        }
      >
        {upVotes}
      </VoteCount>
    </Root>
  );
};

export default withStyles(styles)(Welcome);
