import React, { useState, useEffect } from 'react';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import Tooltip from '@material-ui/core/Tooltip';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
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

const Vote = ({ classes, voteDown, voteUp, upVotes, downVotes, loading }) => {
  const [hasVoted, setHasVoted] = useState(0);
  const [score, setScore] = useState(upVotes - downVotes);

  useEffect(() => {
    setScore(score => score + hasVoted);
  }, [hasVoted]);

  const downVote = async () => {
    if (hasVoted > -1) {
      setHasVoted(hasVoted - 1);
    } else {
      setHasVoted(0);
    }
    return voteDown();
  };

  const upVote = () => {
    if (hasVoted < 1) {
      setHasVoted(hasVoted + 1);
    } else {
      setHasVoted(0);
    }
    return voteUp();
  };

  return (
    <div className={classes.container}>
      <Tooltip title="vote up" placement="top" onClick={loading || upVote}>
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
        {score}
      </div>
      <Tooltip title="vote down" placement="top" onClick={loading || downVote}>
        <DownIcon
          style={hasVoted < 0 ? { color: '#85bdcb' } : {}}
          fontSize="large"
        />
      </Tooltip>
    </div>
  );
};

export default withStyles(styles)(Vote);
