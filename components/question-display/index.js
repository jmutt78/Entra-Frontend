import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Answers from '../answers-display/Answers.js'
import CreateAnswer from '../create-answer'
import MainQuestion from './MainQuestion.js'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import questionQuery from './questionQuery'

const styles = ({ palette, layout }) => ({
  container: {
    width: layout.width,
    height: '100%',
  },
  titleContainer: {
    padding: '0 0 2rem 0',
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
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
              <div className={classes.titleContainer}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="display3" className={classes.title}>
                          {question.title}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </div>

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
