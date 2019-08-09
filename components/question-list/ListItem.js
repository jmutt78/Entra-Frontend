import React from 'react'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'next/router'

const CustomTableCell = withStyles(theme => ({
  head: {
    width: 5,
  },
}))(TableCell)

const styles = ({ layout, palette }) => ({
  title: {
    color: palette.accent.blue,
    padding: 0,
  },
  nameLink: {
    fontWeight: 500,
    textDecoration: 'none',
    color: palette.primary.dark,
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      background: '#f1f2f6',
    },
  },
})

const ListItem = ({
  question: { id, title, link, createdAt, tags, answers, views, upVotes, downVotes, askedBy },
  classes,
  router,
}) => {
  return (
    <TableRow
      key={id}
      className={classes.tableRow}
      onClick={() =>
        router.push({
          pathname: '/question',
          query: { id: id },
        })
      }
    >
      <TableCell component="th" scope="row">
        <Typography>
          <h2 className={classes.title}>{title}</h2>
          <div style={{ display: 'flex', padding: '0 0 10px 0' }}>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
              {tags.map(({ id, name }) => (
                <Button size="small" variant="contained">
                  {name}{' '}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </Typography>
        <Typography>
          <span>Posted by </span>
          <a href={`/${askedBy[0].name}`} className={classes.nameLink}>
            {askedBy[0].name}
          </a>
          <span> on </span>
          <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
        </Typography>
      </TableCell>

      <TableCell>{answers.length}</TableCell>
      <CustomTableCell>{views}</CustomTableCell>
      <CustomTableCell>{upVotes}</CustomTableCell>
      <CustomTableCell>{downVotes}</CustomTableCell>
    </TableRow>
  )
}

export default withRouter(withStyles(styles)(ListItem))
