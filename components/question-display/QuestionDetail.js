import React from 'react'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'next/router'
import { withStyles } from '@material-ui/core/styles'

import ApproveQuestion from '../approval/AppoveQuestion.js'

const styles = ({ layout, palette, spacing }) => ({
  title: {
    color: palette.accent.dark,
    padding: '5px 0 15px 0',
    margin: 0,
    maxWidth: 800,
  },
  body: {
    color: palette.accent.dark,
    padding: '5px 0 15px 0',
    margin: 0,
    maxWidth: 800,
  },
  nameLink: {
    fontWeight: 500,
    textDecoration: 'none',
    color: palette.primary.dark,
  },
  tableRow: {
    cursor: 'pointer',
    background: palette.secondary.main,
  },
  button: {
    color: palette.accent.dark,
  },
  detailContainer: {
    padding: '5px 15px',
  },
  // from PromptBar
  buttonTop: {
    backgroundColor: '#E27D60',
    marginLeft: spacing.unit * 2,
  },
  textTop: {
    color: 'white',
    fontSize: 20,
  },
  top: {
    backgroundColor: '#85BDCB',
    boxShadow: 'none',
  },
})

// TODO
const PromptBar = ({ classes, user }) => {
  return user ? null : (
    <AppBar className={classes.top} position="static">
      <Toolbar>
        <Typography className={classes.textTop}>Do you have an Answer? 👉</Typography>
        <Link href="/signup">
          <Button size="medium" className={classes.buttonTop}>
            SIGN UP NOW
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

// TODO put this in the Description somewhere
const EditButton = ({ question, user }) => {
  const answers = question.answers.length
  const date1 = new Date(question.createdAt)
  const date2 = new Date()
  const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24))

  if (question.askedBy[0].id == user.id && diffDays <= 1 && !answers) {
    return (
      <div>
        <Typography>
          <Link
            href={{
              pathname: '/edit-question',
              query: { id: question.id },
            }}
          >
            <a style={{ textDecoration: 'none', color: 'grey' }}>EDIT</a>
          </Link>
        </Typography>
        <DeleteQuestion id={question.id} />
        <div />
      </div>
    )
  }
}

const QuestionDetail = ({
  item: { id, description, createdAt, tags, askedBy },
  router,
  userName,
  question,
  classes,
  user,
}) => {
  const askedby = question.askedBy[0]
  const hasPermissions = user.permissions.some(permission => ['ADMIN', 'MODERATOR'].includes(permission))
  const ownsQuestion = askedby.id === user.id
  const isApproved = question.approval === true

  if (!ownsQuestion && !hasPermissions && !isApproved) {
    // TODO rewrite this
    return <NoQuestion />
  }

  return (
    <div className={classes.detailContainer}>
      <Table>
        <TableBody>
          <TableRow key={id} className={classes.tableRow}>
            <TableCell component="th" scope="row" style={{ padding: '25px 35px' }}>
              <Typography>
                {description && <h3 className={classes.body}>{description}</h3>}
                {tags && (
                  <div style={{ display: 'flex', padding: '0 0 10px 0' }}>
                    <ButtonGroup aria-label="outlined primary button group">
                      {tags.map(({ id, name }) => (
                        <Button
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
                      ))}
                    </ButtonGroup>
                  </div>
                )}
              </Typography>

              <ApproveQuestion
                hasPermissions={hasPermissions}
                isApproved={isApproved}
                id={question.id}
                approval={question.approval}
              />

              <Typography style={{ paddingTop: 5 }}>
                <span>Posted by </span>
                <a href={`/${userName}`} className={classes.nameLink}>
                  {userName}
                </a>
                <span> on </span>
                <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default withRouter(withStyles(styles)(QuestionDetail))
