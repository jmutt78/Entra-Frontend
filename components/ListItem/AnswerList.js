import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { format, parseISO } from 'date-fns';

import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ClampLines from 'react-clamp-lines';

import { Mixpanel } from '../../utils/Mixpanel';
import Avatar from '../Avatar';
import Vote from '../Vote';
import './index.css';

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    maxWidth: '800px',
    height: '160px',
    borderRadius: 0,
    borderBottom: '1px solid #e8e8e8'
  },

  textBox: {
    flex: 10,

    flexDirection: 'column',
    justifyContent: 'space-around'
  },

  body: {
    padding: 0,
    margin: 0,
    color: '#6f6f6f',
    fontSize: '.75rem',
    textAlign: 'left',
    cursor: 'pointer',
    fontWeight: 500
  },

  nameLink: {
    fontWeight: 500,
    textDecoration: 'none',
    color: '#e27d60'
  },
  credits: {
    paddingTop: 10,
    fontSize: '.75rem',
    fontWeight: 500,
    order: 2
  }
});

const AnswerListItem = ({
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
    views,
    bountyPoints
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
  console.log(bountyPoints);
  return (
    <Card className={classes.container}>
      <div>
        <Link
          href={{
            pathname: '/user',
            query: { id: userId }
          }}
        >
          <a style={{ textDecoration: 'none' }}>
            {<Avatar me={user} small linkToId={userId} />}
          </a>
        </Link>
      </div>
      <div className={classes.textBox}>
        <Link href={linkTo}>
          <a style={{ textDecoration: 'none' }}>
            <ClampLines
              className={classes.body}
              text={body}
              id="really-unique-id"
              lines={3}
              ellipsis="..."
              innerElement="p"
              buttons={false}
            />
          </a>
        </Link>
        <div>
          <div className={classes.credits}>
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
            on <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')} </span>
            <span style={{ fontWeight: 'bold' }}>
              {' · '}
              {Math.abs(upVotes - downVotes)}{' '}
              {upVotes - downVotes < 0 ? 'Down' : 'Up'}vote
              {Math.abs(upVotes - downVotes) === 1 ? '' : 's'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default withRouter(withStyles(styles)(AnswerListItem));
