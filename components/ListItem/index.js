import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { format, parseISO } from 'date-fns';

import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

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
    fontSize: '.75rem',
    fontWeight: 500,
    order: 2
  },

  voteBox: {
    flex: 1
  },

  answerContainer: {
    paddingTop: 5,
    order: 3,
    color: '#6f6f6f',
    fontWeight: 'bold'
  },
  icon: {
    paddingTop: 5,
    verticalAlign: 'text-bottom',
    marginLeft: 10,
    color: '#6f6f6f',
    fontWeight: 'bold'
  },
  bounty: {
    color: '#85bdcb',
    fontSize: '.75rem',
    borderColor: '#85bdcb',
    fontWeight: 'bold',
    pointerEvents: 'none'
  },
  bountyContainer: {
    marginTop: 5
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
            <Typography
              variant="h6"
              className={classes.title}
              onClick={handleTracking}
            >
              {title}
            </Typography>
          </a>
        </Link>
        {
          // {description && (
          //   <Link href={linkTo}>
          //     <a style={{ textDecoration: 'none' }}>
          //       <Typography variant="p" className={classes.body}>
          //         {description.substring(0, 60)} {'...'}
          //       </Typography>
          //     </a>
          //   </Link>
          // )}
        }
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
            on <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
            <QuestionAnswerIcon className={classes.icon} />{' '}
            <span className={classes.answerContainer}>{answers.length}</span>
          </div>
        </div>
        {bountyPoints && (
          <div className={classes.bountyContainer}>
            <Button size="small" variant="outlined" className={classes.bounty}>
              Bounty Points: {bountyPoints}
            </Button>
          </div>
        )}
      </div>

      <div className={classes.voteBox}>
        <Vote id={id} />
      </div>
    </Card>
  );
};

export default withRouter(withStyles(styles)(ListItem));
