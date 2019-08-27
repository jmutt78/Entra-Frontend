import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { withStyles } from '@material-ui/core/styles'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import Answers from '../answers-display'
import CreateBookMark from '../bookmark/CreateBookMark.js'
import CreateAnswer from '../create-answer'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import CircularProgress from '@material-ui/core/CircularProgress';
import Error from './../ErrorMessage.js'
import NoQuestion from './NoQuestion'
import QuestionDetail from './QuestionDetail'
import questionQuery from './questionQuery'
import { CURRENT_USER_QUERY } from '../auth/User'

import './index.css'

const styles = ({ palette, layout }) => ({
  container: {
    width: '100%',
    maxWidth: 1200,

    height: '100%',
    minHeight: layout.contentMinHeight,

  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: '3rem',
    // wordBreak: 'break-all',
  },
  voteContainer: {
    display: 'flex',
  },
  voteButton: {
    cursor: 'pointer',
  },
  upVote: {
    color: palette.primary.main,
    fontSize: '1.4rem',
    padding: '0 1rem',
  },
  downVote: {

    color: palette.accent.blue,
    fontSize: '1.4rem',
    padding: '0 1rem'
  },
  viewsCount: {
    color: palette.accent.dark,
    fontSize: '1.4rem',
  },
})


export const CREATE_QUESTION_VOTE_MUTATION = gql`
  mutation CREATE_QUESTION_VOTE_MUTATION($questionId: ID!, $vote: String) {
    createQuestionVote(questionId: $questionId, vote: $vote)
  }
`

export const CREATE_QUESTION_VIEW_MUTATION = gql`
  mutation CREATE_QUESTION_VIEW_MUTATION($questionId: ID!) {
    createQuestionView(questionId: $questionId)
  }
`

const Wrapper = ({ client, classes, id }) => {
  return (
    <Query
      query={questionQuery}
      variables={{
        id,
      }}
    >

      {({ data: { question }, loading }) => {
        if (loading) return <CircularProgress style={{margin: 20}} />
        if (!question) {
          return <p>Question not found</p>
        }

        return <DisplayQuestion question={question} client={client} classes={classes} />
      }}
    </Query>
  )
}

class DisplayQuestion extends Component {
  componentDidMount() {
    this.props.client.mutate({
      mutation: CREATE_QUESTION_VIEW_MUTATION,
      variables: {
        questionId: this.props.question.id,
      },
      refetchQueries: [{ query: questionQuery, variables: { id: this.props.question.id } }],
    })

    this.props.client.query({
      query: CURRENT_USER_QUERY,
    })
  }
  upVote = () => {
    this.props.client.mutate({
      mutation: CREATE_QUESTION_VOTE_MUTATION,
      variables: {
        questionId: this.props.question.id,
        vote: 'up',
      },
      refetchQueries: [{ query: questionQuery, variables: { id: this.props.question.id } }],
    })
  }
  downVote = () => {
    this.props.client.mutate({
      mutation: CREATE_QUESTION_VOTE_MUTATION,
      variables: {
        questionId: this.props.question.id,
        vote: 'down',
      },
      refetchQueries: [{ query: questionQuery, variables: { id: this.props.question.id } }],
    })
  }

  render() {
    const { classes, question } = this.props

    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{margin: 20}} />
          if (error) return <Error error={error} />
          const user = data.me

          const askedby = question.askedBy[0] || null
          const hasPermissions =
            !!user && user.permissions.some(permission => ['ADMIN', 'MODERATOR'].includes(permission))
          const ownsQuestion = !!askedby && !!user && askedby.id === user.id
          const isApproved = question.approval === true

          if (!ownsQuestion && !hasPermissions && !isApproved) {
            return <NoQuestion />
          }

          return (
            <div className={classes.container} id="tableBorderRemoveTarget">
              <div className="titleContainer">
                <Typography variant="h6" className={classes.title}>
                  {question.title}
                </Typography>

                <div className="controls">
                  <Tooltip
                    title="vote up"
                    placement="top"
                    className={classes.voteButton}
                    onClick={this.upVote}
                  >
                      <div className={classes.voteContainer}>
                        <span className={classes.upVote}>{question.upVotes}</span>
                        <img src="/static/thumb_up.svg" />{' '}
                      </div>
                  </Tooltip>
                  <span>{"  "}
                  </span>
                  <Tooltip
                    title="vote down"
                    placement="top"
                    className={classes.voteButton}
                    onClick={this.downVote}
                  >
                      <div className={classes.voteContainer}>
                        <img src="/static/thumb_down.svg" />
                        <span className={classes.downVote}>{question.downVotes}</span>
                      </div>
                  </Tooltip>

                  {user && (
                    <Tooltip title="Bookmark this" placement="top">
                        <CreateBookMark user={user} question={question} />
                    </Tooltip>
                  )}
                </div>
              </div>

              <QuestionDetail
                item={question}
                linkTo={{
                  pathname: '/question',
                  query: { id: question.id },
                }}
                question={question}
                user={user}
              />

              <Answers id={this.props.id} question={question} />
              <CreateAnswer question={question} />
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(withApollo(Wrapper))
