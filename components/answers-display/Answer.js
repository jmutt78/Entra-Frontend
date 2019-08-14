import React from 'react'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles'
import { withApollo } from 'react-apollo'

import ApproveAnswer from '../approval/AppoveAnswer.js'
import DeleteAnswer from '../delete-answer'
import Icon from '../ui/Icon'
import SelectAnswer from '../approval/SelectAnswer'
import questionQuery from '../question-display/questionQuery'

const CREATE_ANSWER_VOTE_MUTATION = gql`
  mutation CREATE_ANSWER_VOTE_MUTATION($answerId: ID!, $vote: String) {
    createAnswerVote(answerId: $answerId, vote: $vote) {
      id
    }
  }
`

const styles = ({ spacing, palette }) => ({
  bigAvatar: {
    width: 70,
    height: 70,
    cursor: 'pointer',
  },
  photoTitle: {
    display: 'inline-flex',
    marginRight: 10,
    marginBottom: 20,
  },
  date: {
    marginTop: 20,
  },
  description: {
    fontSize: 17,
  },
  editButton: {
    backgroundColor: palette.accent.blue,
  },
  answerContainer: {
    padding: '10px 0',
  },
})

const EditAndDelete = ({ answer, classes, user }) => {
  const selected = answer.selected

  const date1 = new Date(answer.createdAt)
  const date2 = new Date()
  const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24))

  return user && answer.answeredBy.id === user.id && diffDays <= 2 && selected === null ? (
    <Typography style={{ padding: '10px 0' }}>
      <Link
        href={{
          pathname: '/edit-answer',
          query: { id: answer.id },
        }}
      >
        <Button variant="contained" color="secondary" className={classes.editButton}>
          EDIT
        </Button>
      </Link>
      <DeleteAnswer id={answer.id} />
    </Typography>
  ) : null
}

const Answer = ({ answer, classes, user, client, question }) => {
  const answeredBy = answer.answeredBy.id
  const ownsAnswer = user && answeredBy === user.id
  const isApproved = answer.approval === true
  const questionId = answer.answeredTo[0].id
  const hasPermissions = user && user.permissions.some(permission => ['ADMIN', 'MODERATOR'].includes(permission))

  const upVote = answerId => {
    client.mutate({
      mutation: CREATE_ANSWER_VOTE_MUTATION,
      variables: {
        answerId,
        vote: 'up',
      },
      refetchQueries: [{ query: questionQuery, variables: { id: question.id } }],
    })
  }

  const downVote = answerId => {
    client.mutate({
      mutation: CREATE_ANSWER_VOTE_MUTATION,
      variables: {
        answerId,
        vote: 'down',
      },
      refetchQueries: [{ query: questionQuery, variables: { id: question.id } }],
    })
  }

  if (!ownsAnswer && !hasPermissions && !isApproved) {
    return null
  }

  return (
    <div key={answer.id} className={classes.answerContainer}>
      <div className={classes.photoTitle}>
        <Link
          href={{
            pathname: '/user',
            query: { id: answeredBy },
          }}
        >
          {answer.answeredBy.image === null || answer.answeredBy.image === '' ? (
            <Avatar className={classes.bigAvatar}>{answer.answeredBy.display[0]}</Avatar>
          ) : (
            <Avatar alt="Remy Sharp" src={answer.answeredBy.image} className={classes.bigAvatar} />
          )}
        </Link>

        <Typography
          style={{
            paddingTop: 20,
            marginLeft: 10,
          }}
        >
          <strong>{answer.answeredBy.display}</strong> says:
        </Typography>
      </div>
      <Typography className={classes.description}>{answer.body}</Typography>
      <Grid item xs={2} container>
        <Grid item xs={4}>
          <Icon onClick={() => upVote(answer.id)} src="/static/thumb_up.svg" />
          <div>{answer.upVotes}</div>
        </Grid>
        <Grid item xs={4}>
          <Icon onClick={() => downVote(answer.id)} src="/static/thumb_down.svg" />
          <div>{answer.downVotes}</div>
        </Grid>
      </Grid>
      <Typography className={classes.date}>
        Posted {format(parseISO(answer.createdAt), 'MMMM dd, yyyy')}
      </Typography>

      <EditAndDelete answer={answer} classes={classes} user={user} />

      <div style={{ paddingBottom: 10 }}>
        <ApproveAnswer
          hasPermissions={hasPermissions}
          isApproved={isApproved}
          approval={answer.approval}
          id={answer.id}
          questionId={questionId}
        />
      </div>
      <SelectAnswer
        canSelect={user && question.askedBy[0].id === user.id}
        selected={answer.selected}
        id={answer.id}
        questionId={questionId}
      />
    </div>
  )
}

export default withStyles(styles)(withApollo(Answer))
