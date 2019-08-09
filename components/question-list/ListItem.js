import React from 'react'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const CustomTableCell = withStyles(theme => ({
  head: {
    width: 5,
  },
}))(TableCell)

const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
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

const ListItem = ({ question, classes }) => {
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
}

export default withStyles(styles)(ListItem)
