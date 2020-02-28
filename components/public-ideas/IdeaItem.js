import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { format, parseISO } from 'date-fns';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '../Avatar';
import { Mixpanel } from '../../utils/Mixpanel';

import './index.css';

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    maxWidth: '1000px',
    height: '160px',
    borderRadius: 0,
    borderBottom: '1px solid #e8e8e8'
  },
  votesBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer'
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
    color: '#333',
    maxWidth: 800,
    fontWeight: 'bold',
    fontSize: '1rem',
    textAlign: 'left',
    cursor: 'pointer'
  },

  body: {
    padding: 0,
    margin: 0,
    color: '#6f6f6f',
    maxWidth: 800,
    lineHeight: '1.8rem',
    fontSize: '.75rem',
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
    Mixpanel.track('Idea Link');
  }

  function handleUserTracking(e) {
    Mixpanel.track('User Profile');
  }

  return (
    <Card className={classes.container}>
      <div className="avatarBox">
        <Avatar me={user} small linkToId={userId} />
      </div>
      <div className={classes.textBox}>
        <Link href={linkTo}>
          <a style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              className={classes.title}
              onClick={handleTracking}
            >
              {idea}
            </Typography>
          </a>
        </Link>
        <div style={{ padding: '5px 0 10px 0', fontSize: '.75rem' }}>
          Created by {}
          <Link
            href={{
              pathname: '/user',
              query: { id: userId }
            }}
          >
            <a className={classes.nameLink} onClick={handleUserTracking}>
              {display}
            </a>
          </Link>{' '}
          on <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
          <span> · </span>
        </div>
      </div>
    </Card>
  );
};

export default withRouter(withStyles(styles)(IdeaItem));
