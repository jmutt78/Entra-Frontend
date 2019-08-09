import React, { Component } from 'react'
import Link from 'next/link'
import { upperFirst } from 'lodash'
import { format, parseISO } from 'date-fns'

import Grid from '@material-ui/core/Grid'
import QuestionAnswer from '@material-ui/icons/QuestionAnswer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Pagination from '../pagination'
import QuestionSearch from '../search/QuestionSearch.js'

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
  icon: {
    color: 'black',
  },
})

function tagsList(tags) {
  return tags.map(tags => (
    <div key={tags.id} style={{ display: 'inline-flex', marginRight: 10 }}>
      <Typography style={{ textTransform: 'uppercase' }}>
        <strong>{tags.name} </strong>
      </Typography>
    </div>
  ))
}

function QuestionList(props) {
  const { classes, questions, filter, page } = props

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
                {upperFirst(filter)} Questions
              </Typography>
            </TableCell>
            <Tooltip title="Answers" placement="top">
              <CustomTableCell style={customColumnStyle}>
                <QuestionAnswer className={classes.icon} />
              </CustomTableCell>
            </Tooltip>
            <Tooltip title="Views" placement="top">
              <CustomTableCell style={customColumnStyle}>
                <img src="/static/visibility.svg" />
              </CustomTableCell>
            </Tooltip>
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
          {questions.map(question => {
            return (
              <TableRow key={question.id}>
                <TableCell component="th" scope="row">
                  <Typography>
                    <Link
                      href={{
                        pathname: '/question',
                        query: { id: question.id },
                      }}
                    >
                      <a className={classes.link}>{question.title}</a>
                    </Link>
                  </Typography>
                  <Typography>Posted {format(parseISO(question.createdAt), 'MMMM dd, yyyy')}</Typography>
                  {tagsList(question.tags)}
                </TableCell>
                <TableCell>{question.answers.length}</TableCell>
                <CustomTableCell>{question.views}</CustomTableCell>
                <CustomTableCell>{question.upVotes}</CustomTableCell>
                <CustomTableCell>{question.downVotes}</CustomTableCell>
              </TableRow>
            )
          })}
        </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>



      </Table>
      <Pagination page={page} filter={filter} />
    </Grid>
  )
}

export default withStyles(styles)(QuestionList)
