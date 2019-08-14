import React from 'react'
import { Query } from 'react-apollo'

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { CURRENT_USER_QUERY } from '../auth/User'
import Answer from './Answer'

const styles = ({ spacing, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 0 30px 20px',
  },
  title: {
    color: palette.accent.dark,
    padding: '5px 0 0 0',
    margin: 0,
    maxWidth: 800,
    fontWeight: 300,

    fontSize: '1.8rem',
    textAlign: 'left',
    lineHeight: '2.5rem',
  },
})

const Answers = ({ classes, question, user }) => {
  const { answers } = question

  return question.answers.length === 0 ? null : (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>
        const user = data.me

        return (
          <div className={classes.container}>
            {answers === null || answers === '' ? null : (
              <Typography variant="display3" className={classes.title}>
                <h2>Answers</h2>
              </Typography>
            )}

            {answers.map(answer => (
              <Answer answer={answer} user={user} question={question} />
            ))}
          </div>
        )
      }}
    </Query>
  )
}

export default withStyles(styles)(Answers)