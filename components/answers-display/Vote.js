import React, { useState } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withStyles } from '@material-ui/core/styles';

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

const Vote = ({ classes, upvoteCb, downvoteCb, upVotes, downVotes }) => {
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
    <div className={classes.container}>
      <Tooltip title="vote up" placement="top" onClick={() => vote('up')}>
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
        {upVotes - downVotes}
      </div>
      <Tooltip title="vote down" placement="top" onClick={() => vote('down')}>
        <ArrowDropDownIcon
          style={hasVoted < 0 ? { color: '#85bdcb' } : {}}
          fontSize="large"
        />
      </Tooltip>
    </div>
  );
};

export default withStyles(styles)(Vote);
