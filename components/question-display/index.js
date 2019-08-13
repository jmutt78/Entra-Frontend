import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { withStyles } from '@material-ui/core/styles'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import Answers from '../answers-display/Answers.js'
import CreatBookMark from '../bookmark/CreateBookMark.js'
import CreateAnswer from '../create-answer'
import MainQuestion from './MainQuestion.js'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import QuestionDetail from './QuestionDetail'

import questionQuery from './questionQuery'
import { CURRENT_USER_QUERY } from '../auth/User'

const styles = ({ palette, layout }) => ({
  container: {
    width: layout.width,
    maxWidth: 1200,
    height: '100%',
    minHeight: layout.contentMinHeight,
  },
  titleContainer: {
    padding: '0 1rem 2rem 0',
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
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
    padding: '8px 8px 5px 0',
  },
  downVote: {
    color: palette.accent.blue,
    fontSize: '1.4rem',
    padding: '8px 0 5px 8px',
  },
})

const CustomTableCell = withStyles(theme => ({
  head: {
    width: 5,
  },
}))(TableCell)

const CREATE_QUESTION_VOTE_MUTATION = gql`
  mutation CREATE_QUESTION_VOTE_MUTATION($questionId: ID!, $vote: String) {
    createQuestionVote(questionId: $questionId, vote: $vote)
  }
`

const CREATE_QUESTION_VIEW_MUTATION = gql`
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
        if (loading) return <p>Loading...</p>
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
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>
          const user = data.me

          return (
            <div className={classes.container}>
              <div className={classes.titleContainer}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="display3" className={classes.title}>
                          {question.title}
                        </Typography>
                      </TableCell>

                      <Tooltip
                        title="vote up"
                        placement="top"
                        className={classes.voteButton}
                        onClick={this.upVote}
                      >
                        <CustomTableCell style={{ maxWidth: '.3px' }}>
                          <div className={classes.voteContainer}>
                            <span className={classes.upVote}>{question.upVotes}</span>
                            <img src="/static/thumb_up.svg" />
                          </div>
                        </CustomTableCell>
                      </Tooltip>

                      <CustomTableCell style={{ maxWidth: '.3px', padding: '0 10px' }} />

                      <Tooltip
                        title="vote down"
                        placement="top"
                        className={classes.voteButton}
                        onClick={this.downVote}
                      >
                        <CustomTableCell style={{ maxWidth: '.3px' }}>
                          <div className={classes.voteContainer}>
                            <img src="/static/thumb_down.svg" />
                            <span className={classes.downVote}>{question.downVotes}</span>
                          </div>
                        </CustomTableCell>
                      </Tooltip>

                      <Tooltip title="Bookmark this" placement="top">
                        <CustomTableCell style={{ maxWidth: '.3px', padding: '0 0 3px 8px' }}>
                          <CreatBookMark user={user} question={question} />
                        </CustomTableCell>
                      </Tooltip>

                      <CustomTableCell style={{ maxWidth: '.3px', padding: '0 30px' }} />
                    </TableRow>
                  </TableHead>
                </Table>
              </div>

              <Table className={classes.table}>
                <TableBody>
                  <QuestionDetail
                    item={question}
                    linkTo={{
                      pathname: '/question',
                      query: { id: question.id },
                    }}
                    userName={user.name}
                  />
                </TableBody>
              </Table>

              <MainQuestion id={this.props.id} question={question} />
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
