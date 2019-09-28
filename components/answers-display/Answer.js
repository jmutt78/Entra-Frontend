import React from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';

import ApproveAnswer from '../approval/AppoveAnswer.js';
import DeleteAnswer from '../delete-answer';
import SelectAnswer from '../approval/SelectAnswer';
import questionQuery from '../question-display/questionQuery';

import './Answers.css';

export const CREATE_ANSWER_VOTE_MUTATION = gql`
  mutation CREATE_ANSWER_VOTE_MUTATION($answerId: ID!, $vote: String) {
    createAnswerVote(answerId: $answerId, vote: $vote) {
      id
    }
  }
`;

const styles = ({ spacing, palette }) => ({
  body: {
    color: '#2d3436',
    padding: '5px 0 15px 0',
    margin: 0,
    maxWidth: 800,
    fontWeight: 300,
    whiteSpace: 'pre-wrap'
  },
  nameLink: {
    fontWeight: 500,
    textDecoration: 'none',
    color: '#e27d60'
  },
  tableRow: {
    background: palette.secondary.main
  },
  selectedTableRow: {
    background: '#b8e994'
  },
  button: {
    color: '#2d3436'
  },
  detailContainer: {
    padding: '5px 15px'
  },
  buttonTop: {
    backgroundColor: '#E27D60',
    marginLeft: spacing(2)
  },
  textTop: {
    color: 'white',
    fontSize: 20
  },
  editButton: {
    backgroundColor: '#85bdcb'
  },
  signupButton: {
    backgroundColor: '#2d3436',
    '&:hover': {
      // backgroundColor: palette.accent.main
    },
    marginLeft: 10
  },
  avatar: {
    width: 70,
    height: 70,
    cursor: 'pointer'
  },
  credits: { paddingTop: 5, display: 'flex', alignItems: 'center' },
  voteContainer: {
    display: 'flex'
  },
  voteButton: {
    cursor: 'pointer'
  },
  upVote: {
    color: '#e8a77f',
    fontSize: '1.4rem',
    padding: '8px 8px 5px 0'
  },
  downVote: {
    color: '#85bdcb',
    fontSize: '1.4rem',
    padding: '8px 0 5px 8px'
  }
});

const EditAndDelete = ({ answer, classes, user, question }) => {
  return user &&
    answer.answeredBy.id === user.id &&
    parseInt(
      (new Date() - new Date(answer.createdAt)) / (1000 * 60 * 60 * 24)
    ) <= 2 &&
    answer.selected === null ? (
    <Typography
      style={{ padding: '10px 5px', display: 'inline' }}
      component={'div'}
    >
      <Link
        href={{
          pathname: '/edit-answer',
          query: { id: answer.id }
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          className={classes.editButton}
        >
          EDIT
        </Button>
      </Link>
      <DeleteAnswer id={answer.id} questionId={answer.answeredTo[0].id} />
    </Typography>
  ) : null;
};

const Controls = ({ user, question, answer, hasPermissions, classes }) => {
  if (
    hasPermissions ||
    (user && question.askedBy[0].id === user.id) ||
    (user &&
      answer.answeredBy.id === user.id &&
      parseInt(
        (new Date() - new Date(answer.createdAt)) / (1000 * 60 * 60 * 24)
      ) <= 2 &&
      answer.selected === null)
  ) {
    return (
      <>
        <div
          className="questionDetail-divider"
          style={{ maxWidth: '100%', paddingBottom: 15 }}
        >
          <Divider variant="middle" />
        </div>

        <div style={{ paddingLeft: 30 }}>
          <SelectAnswer
            canSelect={user && question.askedBy[0].id === user.id}
            selected={answer.selected}
            id={answer.id}
            questionId={answer.answeredTo[0].id}
          />

          <div style={{ display: 'inline' }}>
            <ApproveAnswer
              hasPermissions={hasPermissions}
              isApproved={answer.approval === true}
              approval={answer.approval}
              id={answer.id}
              questionId={answer.answeredTo[0].id}
            />
          </div>

          <EditAndDelete
            answer={answer}
            classes={classes}
            user={user}
            question={question}
          />
        </div>
      </>
    );
  }
  return null;
};

const Answer = ({ answer, classes, user, client, question }) => {
  const answeredBy = answer.answeredBy.id;
  const ownsAnswer = user && answeredBy === user.id;
  const hasPermissions =
    user &&
    user.permissions.some(permission =>
      ['ADMIN', 'MODERATOR'].includes(permission)
    );

  const upVote = answerId => {
    client.mutate({
      mutation: CREATE_ANSWER_VOTE_MUTATION,
      variables: {
        answerId,
        vote: 'up'
      },
      refetchQueries: [{ query: questionQuery, variables: { id: question.id } }]
    });
  };

  const downVote = answerId => {
    client.mutate({
      mutation: CREATE_ANSWER_VOTE_MUTATION,
      variables: {
        answerId,
        vote: 'down'
      },
      refetchQueries: [{ query: questionQuery, variables: { id: question.id } }]
    });
  };

  if (!ownsAnswer && !hasPermissions && !answer.approval === true) {
    return null;
  }

  return (
    <div className={classes.detailContainer}>
      <div>
        {answer.body && (
          <Typography className={classes.body}>{answer.body}</Typography>
        )}
      </div>

      <div className="answerFooter">
        <div className={classes.credits}>
          <Link
            href={{
              pathname: '/user',
              query: { id: answeredBy }
            }}
          >
            {answer.answeredBy.image === null ||
            answer.answeredBy.image === '' ? (
              <Avatar className={classes.avatar}>
                {answer.answeredBy.display[0]}
              </Avatar>
            ) : (
              <Avatar
                alt="Remy Sharp"
                src={answer.answeredBy.image}
                className={classes.bigAvatar}
              />
            )}
          </Link>

          <div style={{ padding: '0 0 0 10px' }}>
            Answered by{' '}
            <Link
              href={{
                pathname: '/user',
                query: { id: answeredBy }
              }}
            >
              <a className={classes.nameLink}>{answer.answeredBy.display}</a>
            </Link>{' '}
            on{' '}
            <span>{format(parseISO(answer.createdAt), 'MMMM dd, yyyy')}</span>
          </div>
        </div>

        <Controls
          user={user}
          question={question}
          answer={answer}
          hasPermissions={hasPermissions}
          classes={classes}
        />

        {/*
          <div className="votesContainer">
            <Tooltip
              title="vote up"
              placement="top"
              className={classes.voteButton}
              onClick={() => upVote(answer.id)}
            >
          <div className={classes.voteContainer}>
            <span className={classes.upVote}>{answer.upVotes}</span>
            <img src="/static/thumb_up.svg" />
          </div>
        </Tooltip>
        <span>{'    '}</span>
        <Tooltip
          title="vote down"
          placement="top"
          className={classes.voteButton}
          onClick={() => downVote(answer.id)}
        >
          <div className={classes.voteContainer}>
            <img src="/static/thumb_down.svg" />
            <span className={classes.downVote}>{answer.downVotes}</span>
          </div>
        </Tooltip>
      </div>
      */}

        <div className="questionDetail-divider" style={{ maxWidth: '100%' }}>
          <Divider variant="middle" />
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(withApollo(Answer));
