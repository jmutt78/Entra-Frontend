import React from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import classNames from 'classnames';
import gql from 'graphql-tag';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import ApproveAnswer from '../approval/AppoveAnswer.js';
import DeleteAnswer from '../delete-answer';
import SelectAnswer from '../approval/SelectAnswer';
import questionQuery from '../question-display/questionQuery';
import Vote from './Vote';
import { Mixpanel } from '../../utils/Mixpanel';
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
    padding: '5px 0px'
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
  credits: {
    paddingTop: 5,
    paddingRight: 25,
    display: 'flex',
    alignItems: 'center',
    // flexDirection: 'column-reverse',
    justifyContent: 'space-between'
  },
  voteContainer1: {
    display: 'flex',
    marginTop: 3
  },
  voteContainer2: {
    display: 'flex',
    marginTop: 6
  },
  voteButton: {
    cursor: 'pointer'
  },
  upVote: {
    color: '#e8a77f',
    fontSize: '1.4rem',
    padding: '12px 8px 8px 0'
  },
  downVote: {
    color: '#85bdcb',
    fontSize: '1.4rem',
    padding: '8px 0 13px 8px'
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
  let arr = question.answers;
  function selectedExists(selected) {
    return arr.some(function(el) {
      return el.selected === selected;
    });
  }

  const selectedAnswer = selectedExists(true);

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
        ></div>

        <div style={{ paddingLeft: 30 }}>
          <SelectAnswer
            canSelect={user && question.askedBy[0].id === user.id}
            selected={answer.selected}
            id={answer.id}
            questionId={answer.answeredTo[0].id}
            selectedAnswer={selectedAnswer}
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
    Mixpanel.track('Answer upVote');
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
    Mixpanel.track('Answer downVote');
  };

  if (!ownsAnswer && !hasPermissions && !answer.approval === true) {
    return null;
  }

  return (
    <div className={classes.detailContainer}>
      <Paper
        style={{
          background: '#f2f4ef',
          padding: '10px 0 10px 15px',
          marginLeft: 15,
          marginRight: 15,
          marginTop: 15
        }}
      >
        <div>
          {answer.body && (
            <Typography className={classes.body}>{answer.body}</Typography>
          )}
        </div>

        <div className="answerFooter" style={{ background: '#f2f4ef' }}>
          <div className={classNames(classes.credits, 'answerFooterCredits')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  <a className={classes.nameLink}>
                    {answer.answeredBy.display}
                  </a>
                </Link>{' '}
                on{' '}
                <span>
                  {format(parseISO(answer.createdAt), 'MMMM dd, yyyy')}
                </span>
              </div>
            </div>

            <div className="answer-votesContainer">
              <Vote
                upvoteCb={() => upVote(answer.id)}
                downvoteCb={() => downVote(answer.id)}
                upVotes={answer.upVotes}
                downVotes={answer.downVotes}
              />
            </div>
          </div>
        </div>
      </Paper>
      <Controls
        user={user}
        question={question}
        answer={answer}
        hasPermissions={hasPermissions}
        classes={classes}
      />
    </div>
  );
};

export default withStyles(styles)(withApollo(Answer));
