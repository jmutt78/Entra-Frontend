import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import Pagination from '../pagination'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import { upperFirst } from 'lodash'
import ListItem from '../ListItem'

const CustomTableCell = withStyles(theme => ({
  head: {
    width: 5,
  },
}))(TableCell)

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
  },
})

class AnswerList extends Component {
  render() {
    const { classes, answers, filter, page } = this.props

    const customColumnStyle = {
      maxWidth: '.3px',
    }

    return (
      <Grid container className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="display3" className={classes.title}>
                  {upperFirst(filter)} Answers
                </Typography>
              </TableCell>
              <Tooltip title="Up Votes" placement="top">
                <CustomTableCell style={customColumnStyle}>
                  <img src="/static/thumb_up.svg" />
                </CustomTableCell>
              </Tooltip>
              <Tooltip title="Down Votes" placement="top">
                <CustomTableCell style={customColumnStyle}>
                  <img src="/static/thumb_down.svg" />
                </CustomTableCell>
              </Tooltip>
            </TableRow>
          </TableHead>
          <TableBody>
            {answers.map(answer => {
              return (
                <ListItem
                  item={answer}
                  linkTo={{
                    pathname: '/question',
                    query: { id: answer.answeredTo[0].id },
                  }}
                  userName={answer.answeredTo[0].name}
                />
              )
            })}
          </TableBody>
        </Table>
        <Pagination page={page} filter={filter} />
      </Grid>
    )
  }
}

export default withStyles(styles)(AnswerList)
