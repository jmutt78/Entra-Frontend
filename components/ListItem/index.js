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

import './index.css'

export const CustomTableCell = withStyles(theme => ({
  head: {
    width: 5,
  },
}))(TableCell)

const styles = ({ layout, palette }) => ({
  title: {
    color: '#2d3436',
    padding: '5px 0 15px 0',
    margin: 0,
    maxWidth: 800,
    fontWeight: 'bold',
    lineHeight: '2.2rem',
    // wordBreak: 'break-all',
  },
  body: {
    color: '#2d3436',
    padding: '5px 0 15px 0',
    margin: 0,
    maxWidth: 800,
    lineHeight: '2.1rem',
    // wordBreak: 'break-all',
  },
  nameLink: {
    fontWeight: 500,
    textDecoration: 'none',
    color: '#e27d60',
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      background: '#f1f2f6',
    },
  },
  button: {
    // /color: palette.primary.dark
  },
})

const ListItem = ({
  item: { id, title, body, link, createdAt, tags, answers, views, upVotes, downVotes, askedBy },
  classes,
  router,
  linkTo,
  userName,
  userId,
  showDetails,
  display,
}) => {
  return (
    <TableRow key={id} className={classes.tableRow} onClick={() => router.push(linkTo)}>
      <TableCell component="th" scope="row">
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="h5" className={classes.body}>
          {body}
        </Typography>

        {tags && (
          <div className="tagButtons">
            {tags.map(({ id, name }) => (
              <div key={id} style={{ padding: '2px 0' }}>
                <Button
                  key={id}
                  size="small"
                  variant="contained"
                  className={classes.button}
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    router.push({
                      pathname: '/tags',
                      query: { id: id },
                    })
                  }}
                >
                  {name}
                </Button>
              </div>
            ))}
          </div>
        )}

        <Typography style={{ paddingTop: 5 }}>
          <span>Posted by </span>
          <Link
            href={{
              pathname: '/user',
              query: { id: userId },
            }}
          >
            <a className={classes.nameLink}>{display}</a>
          </Link>
          <span> on </span>
          <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
        </Typography>
      </TableCell>

      {showDetails && (
        <>
          <TableCell>{answers.length}</TableCell>
          <CustomTableCell>{views}</CustomTableCell>
        </>
      )}
      <CustomTableCell>{upVotes}</CustomTableCell>
      <CustomTableCell>{downVotes}</CustomTableCell>
    </TableRow>
  )
}

export default withRouter(withStyles(styles)(ListItem))
