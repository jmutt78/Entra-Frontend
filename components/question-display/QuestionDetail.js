import React from 'react'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import DeleteQuestion from '../delete-question'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Toolbar from '@material-ui/core/Toolbar'
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
    fontWeight: 300,
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
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px',
  },
  editButton: {
    backgroundColor: palette.accent.blue,
  },
  signupButton: {
    backgroundColor: palette.primary.dark,
    '&:hover': {
      backgroundColor: palette.primary.main,
    },
    marginLeft: 10,
  },
})

const PromptBar = ({ classes, user }) => {
  return user ? null : (
    <div className={classes.top} position="static">
      <Typography className={classes.textTop}>Do you have an Answer? 👉</Typography>

      <Link href="/signup">
        <Button variant="contained" color="secondary" className={classes.signupButton}>
          Sign up now
        </Button>
      </Link>
    </div>
  )
}

const EditButton = ({ question, user, classes }) => {
  const answers = question.answers.length
  const date1 = new Date(question.createdAt)
  const date2 = new Date()
  const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24))

  return user && question.askedBy[0].id === user.id && diffDays <= 1 && !answers ? (
    <Typography style={{ paddingBottom: 10 }}>
      <Link
        href={{
          pathname: '/edit-question',
          query: { id: question.id },
        }}
      >
        <Button variant="contained" color="secondary" className={classes.editButton}>
          EDIT
        </Button>
      </Link>
      <DeleteQuestion id={question.id} />
    </Typography>
  ) : null
}

const QuestionDetail = ({
  item: { id, description, createdAt, tags, askedBy },
  router,
  userName,
  question,
  classes,
  user,
}) => {
  const hasPermissions =
    !!user && user.permissions.some(permission => ['ADMIN', 'MODERATOR'].includes(permission))
  const isApproved = question.approval === true

  console.log({ question })

  return (
    <div className={classes.detailContainer}>
      <PromptBar classes={classes} user={user} />
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

              <div style={{ paddingBottom: 10 }}>
                <ApproveQuestion
                  hasPermissions={hasPermissions}
                  isApproved={isApproved}
                  id={question.id}
                  approval={question.approval}
                />
              </div>

              <EditButton question={question} user={user} classes={classes} />

              <Typography style={{ paddingTop: 5 }}>
                <span>Posted by </span>
                <a href={`/users/${question.askedBy[0].id}`} className={classes.nameLink}>
                  {question.askedBy[0].name}
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
