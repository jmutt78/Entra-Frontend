import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { format, parseISO } from 'date-fns';

import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '../Avatar';
import './index.css';

export const CREATE_QUESTION_VOTE_MUTATION = gql`
  mutation CREATE_QUESTION_VOTE_MUTATION($questionId: ID!, $vote: String) {
    createQuestionVote(questionId: $questionId, vote: $vote)
  }
`;

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
  const [userVote, setUserVote] = useState(0);

  const upVote = () => {
    if (userVote > 0) {
      setUserVote(0);
    } else {
      setUserVote(1);
      client.mutate({
        mutation: CREATE_QUESTION_VOTE_MUTATION,
        variables: {
          questionId: id,
          vote: 'up'
        }
        // refetchQueries: [{ query: questionQuery, variables: { id } }],
      });
    }
  };
  const downVote = () => {
    if (userVote < 0) {
      setUserVote(0);
    } else {
      setUserVote(-1);
      client.mutate({
        mutation: CREATE_QUESTION_VOTE_MUTATION,
        variables: {
          questionId: id,
          vote: 'down'
        }
        // refetchQueries: [{ query: questionQuery, variables: { id } }],
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className="avatarBox">
        <Avatar me={user} small linkToId={userId} />
      </div>
      {answers && (
        <div className={classNames(classes.votesBox, 'votesBox')}>
          <Tooltip title="vote up" placement="top" onClick={upVote}>
            <UpIcon
              style={userVote > 0 ? { color: '#e8a77f' } : {}}
              fontSize="large"
            />
          </Tooltip>
          <div
            className={classes.votesCount}
            style={
              userVote > 0
                ? { color: '#e8a77f' }
                : userVote < 0
                ? { color: '#85bdcb' }
                : {}
            }
          >
            {upVotes - downVotes + userVote}
          </div>
          <Tooltip title="vote down" placement="top" onClick={downVote}>
            <DownIcon
              style={userVote < 0 ? { color: '#85bdcb' } : {}}
              fontSize="large"
            />
          </Tooltip>
        </div>
      )}

      <div className={classes.textBox}>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => router.push(linkTo)}
        >
          {title}
        </Typography>

        {body && (
          <Typography
            variant="p"
            className={classes.body}
            onClick={() => router.push(linkTo)}
          >
            {body}
          </Typography>
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
            <a className={classes.nameLink}>{display}</a>
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

        {/*tags && (
          <div className="tags">
            {tags.map(({ id, name }) => (
              <div key={id} style={{ padding: '2px 0' }}>
                <Button
                  key={id}
                  size="small"
                  variant="contained"
                  className={classes.button}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    router.push({
                      pathname: '/tags',
                      query: { id: id },
                    })
                  }}
                >
                  {name}
                </Button>
              </div>
            ))}
          </div>
        )*/}
      </div>

      {/*
          <Typography style={{ paddingTop: 5 }}>
            <span>Posted by </span>
            <Link
              href={{
                pathname: '/user',
                  query: { id: userId }
              }}
            >
              <a className={classes.nameLink}>{display}</a>
          </Link>
          <span> on </span>
          <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
          </Typography>
      */}

      {/*showDetails && (
        <>
          <TableCell>{answers.length}</TableCell>
          <CustomTableCell>{views}</CustomTableCell>
        </>
      )*/}
    </div>
  );
};

export default withRouter(withStyles(styles)(withApollo(ListItem)));
