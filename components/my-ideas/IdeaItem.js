import React from 'react';
import { withRouter } from 'next/router';
import { format, parseISO } from 'date-fns';

import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { Mixpanel } from '../../utils/Mixpanel';

import './index.css';

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px'
  },
  votesBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer'
  },
  votesCount: {
    fontWeight: 600,
    fontSize: '1rem'
  },
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },

  title: {
    padding: 0,
    margin: 0,
    color: '#2d3436',
    maxWidth: 800,
    fontWeight: 'bold',
    lineHeight: '1.9rem',
    textAlign: 'left',
    cursor: 'pointer'
  },

  body: {
    padding: 0,
    margin: 0,
    color: '#2d3436',
    maxWidth: 800,
    lineHeight: '1.8rem',
    fontSize: '1.1rem',
    textAlign: 'left',
    cursor: 'pointer',
    fontWeight: 500
  },
  // tags: {},

  nameLink: {
    fontWeight: 500,
    textDecoration: 'none',
    color: '#e27d60'
  },
  button: {
    // /color: palette.primary.dark
  }
});

const IdeaItem = ({
  client,
  item: { idea, createdAt },
  classes,
  router,
  linkTo,
  user,
  userId,
  showDetails,
  display
}) => {
  function handleTracking(e) {
    Mixpanel.track('My Idea Link');
    router.push(linkTo);
  }

  return (
    <div className={classes.container}>
      <div className={classes.textBox}>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={handleTracking}
        >
          {idea}
        </Typography>

        <div style={{ padding: '5px 0 10px 0' }}>
          Created On <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(withStyles(styles)(IdeaItem));
