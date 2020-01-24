import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { format, parseISO } from 'date-fns';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import { Mixpanel } from '../../utils/Mixpanel';
import Avatar from '../Avatar';
import Vote from '../Vote';
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

const ListItem = ({
  question,
  client,
  item: {
    answers,
    askedBy,
    body,
    createdAt,
    description,
    downVotes,
    id,
    link,
    tags,
    title,
    upVotes,
    views
  },
  classes,
  router,
  linkTo,
  user,
  userId,
  showDetails,
  display
}) => {
  function handleTracking(e) {
    Mixpanel.track('Question Link');
  }

  function handleUserTracking(e) {
    Mixpanel.track('User Profile');
  }
  return (
    <Card className={classes.container}>
      <div className="avatarBox">
        <Avatar me={user} small linkToId={userId} />
      </div>
      {answers && (
        <div className="votesBox">
          <Vote id={id} />
        </div>
      )}

      <div className={classes.textBox}>
        <Link href={linkTo}>
          <a style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              className={classes.title}
              onClick={handleTracking}
            >
              {title}
            </Typography>
          </a>
        </Link>
        {body && (
          <Link href={linkTo}>
            <a style={{ textDecoration: 'none' }}>
              <Typography variant="p" className={classes.body}>
                {body}
              </Typography>
            </a>
          </Link>
        )}

        <div
          style={
            answers ? { padding: '5px 0 0 0' } : { padding: '5px 0 10px 0' }
          }
        >
          {answers ? 'Asked by' : 'Answered by'}{' '}
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
          {answers ? (
            <span>
              {answers.length} Answer{answers.length === 1 ? '' : 's'}
            </span>
          ) : (
            <span>
              {Math.abs(upVotes - downVotes)}{' '}
              {upVotes - downVotes < 0 ? 'Down' : 'Up'}vote
              {Math.abs(upVotes - downVotes) === 1 ? '' : 's'}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default withRouter(withStyles(styles)(ListItem));
