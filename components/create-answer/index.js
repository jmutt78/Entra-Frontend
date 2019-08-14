import React from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Typography from "@material-ui/core/Typography";

import Link from 'next/link'

import questionQuery from '../question-display/questionQuery.js'
import { CURRENT_USER_QUERY } from '../auth/User'

const styles = ({ spacing, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 0 30px 20px',
  },
  inputField: {
    width: '100%',
    maxWidth: 600,
    marginBottom: 30,
  },
  label: {
    marginLeft: 10,
    marginBotom: 10,
  },
  postQuestionButton: {
    alignItems: 'flex-end',
  },
  title: {
    color: palette.accent.dark,
    padding: '5px 0 15px 0',
    margin: 0,
    maxWidth: 800,
    fontWeight: 300,

    fontSize: '1.8rem',
    textAlign: 'left',
    lineHeight: '2.5rem',

  },
  button: {
    margin: '20px 0 5px 0',
    background: palette.accent.blue,
    // '&:hover': {
    //   background: palette.primary.dark,
    // },
  },
})

export const CREATE_ANSWER = gql`
  mutation creatAnswer($questionId: ID!, $body: String!) {
    createAnswer(questionId: $questionId, body: $body) {
      id
      body
    }
  }
`

class CreateAnswer extends React.Component {
  state = {
    body: '',
  }

  handleDescriptionChange = e => {
    this.setState({
      body: e.target.value,
    })
  }

  submitForm = async (e, createQuestion) => {
    e.preventDefault()
    const res = await createQuestion({
      variables: {
        questionId: this.props.question.id,
        ...this.state,
      },
    })

    this.setState({
      body: '',
    })
  }

  handleQuestion(id, myAnswers, body, classes, loading, createQuestion) {
    const arr = []
    for (var i = 0; i < myAnswers.length; i++) {
      const answers = [myAnswers[i].answeredTo[0]]
      arr.push(answers)
    }
    const num = arr.some(element => element[0].id === id)

    return num === true ? null : (
      <div className={classes.container}>
        <div style={{ maxWidth: 600, marginLeft: '-10px' }}>
          <Divider variant="middle" />
        </div>
        <Typography variant="display3" className={classes.title}>
          <h2>
            Have an answer?
          </h2>
        </Typography>

        <form method="post" onSubmit={e => this.submitForm(e, createQuestion)}>
          <fieldset
            disabled={loading}
            aria-busy={loading}
            style={{
              borderWidth: '0px',
              padding: 0,
            }}
          >
            <label htmlFor="body">
              <TextField
                label="Answer"
                type="text"
                name="body"
                variant="filled"
                multiline
                rows={8}
                value={body}
                onChange={this.handleDescriptionChange}
                className={classes.inputField}
              />
            </label>
          </fieldset>
          <Button variant="contained" type="submit" className={classes.button}>
            Post Answer
          </Button>
        </form>
      </div>
    )
  }

  render() {
    const { classes } = this.props
    const { body } = this.state

    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>
          const user = data.me
          if (!user) {
            return <div />
          }
          const myAnswers = user.myAnswers
          const id = this.props.question.id
          return (
            <Mutation
              mutation={CREATE_ANSWER}
              variables={this.state}
              refetchQueries={[
                {
                  query: questionQuery,
                  variables: { id: this.props.question.id },
                },
                { query: CURRENT_USER_QUERY },
              ]}
            >
              {(createQuestion, { error, loading }) => {
                return <div>{this.handleQuestion(id, myAnswers, body, classes, loading, createQuestion)}</div>
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(CreateAnswer)
