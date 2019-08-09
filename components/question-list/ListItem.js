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

const styles = ({ layout, palette }) => ({
  link: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  nameLink: {
   fontWeight: 500,
    textDecoration: 'none',
    color: palette.primary.dark,
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

const ListItem = ({ question: { id, title, link, createdAt, tags, answers, views, upVotes, downVotes, askedBy }, classes }) => {
  return (
    <TableRow key={id}>
      <TableCell component="th" scope="row">
        <Typography>
          <Link
            href={{
              pathname: '/question',
              query: { id: id },
            }}
          >

        <Typography>
          <h2 className={classes.link}>{title}</h2>
        </Typography>


          </Link>
        </Typography>
        <Typography>
          <span>Posted by </span>
          <a href={`/${askedBy[0].name}`} className={classes.nameLink}>{askedBy[0].name}</a>
          <span> on </span>
          <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
        </Typography>
        {tagsList(tags)}
      </TableCell>
      <TableCell>{answers.length}</TableCell>
      <CustomTableCell>{views}</CustomTableCell>
      <CustomTableCell>{upVotes}</CustomTableCell>
      <CustomTableCell>{downVotes}</CustomTableCell>
    </TableRow>
  )
}

export default withStyles(styles)(ListItem)
