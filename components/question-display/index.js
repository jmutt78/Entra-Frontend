import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { withStyles } from '@material-ui/core/styles'

import Answers from '../answers-display/Answers.js'
import CreateAnswer from '../create-answer'
import MainQuestion from './MainQuestion.js'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import questionQuery from './questionQuery'

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
    padding: '8px 8px 5px 0'
  },
  downVote: {
    color: palette.accent.blue,
    fontSize: '1.4rem',
    padding: '8px 0 5px 8px'
  },
})

const CustomTableCell = withStyles(theme => ({
  head: {
    width: 5,
  },
}))(TableCell)

class DisplayQuestion extends Component {
  upVote = () => {}

  downVote = () => {}

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
                      <CustomTableCell style={{ maxWidth: '.3px' }} />

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
