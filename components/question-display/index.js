import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import MainQuestion from './MainQuestion.js'
import CreateAnswer from '../create-answer'
import Answers from '../answers-display/Answers.js'

import questionQuery from './questionQuery'

const styles = ({ palette, layout }) => ({
  container: {
    width: layout.width,
    height: '100%',
  },
})

class DisplayQuestion extends Component {
  render() {
    const { classes } = this.props

    return (
      <Query
        query={questionQuery}
        variables={{
          id: this.props.id,
        }}
      >
        {({ data: { question }, loading }) => {
          if (loading) return <p>Loading...</p>
          if (!question) {
            return <p>Question not found</p>
          }
          return (
            <div className={classes.container}>
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

export default withStyles(styles)(DisplayQuestion)
