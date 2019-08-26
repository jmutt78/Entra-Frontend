import React from 'react'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import DeleteQuestion from '../delete-question'
import Icon from '../ui/Icon'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import { withRouter } from 'next/router'
import { withStyles } from '@material-ui/core/styles'

import ApproveQuestion from '../approval/AppoveQuestion.js'

import './index.css'

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
    // wordBreak: 'break-all',
  },
  nameLink: {
    fontWeight: 500,
    textDecoration: 'none',
    color: '#e27d60',
  },
  tableRow: {
    background: palette.secondary.main,
  },
  detailContainer: {
    padding: '5px 15px',
  },
  buttonTop: {
    backgroundColor: '#E27D60',
    marginLeft: spacing(2),
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
  avatar: {
    width: 70,
    height: 70,
    cursor: 'pointer',
  },
  credits: {
    paddingTop: 5,
    display: 'flex',
    alignItems: 'center',
  },
  viewsCount: {
    color: palette.accent.dark,
    fontSize: '1.2rem',
    padding: '5px 0 5px 8px',
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

  return (
    <div className={classes.detailContainer}>
      <PromptBar classes={classes} user={user} />
      <Table>
        <TableBody>
          <TableRow className={classes.tableRow}>
            <TableCell component="th" scope="row" style={{ padding: '25px 35px' }}>
              <div>
                {description && <h3 className={classes.body}>{description}</h3>}
                {tags && (
                  <div className="tagButtons">
                    {tags.map(({ id, name }) => (
                      <div key={id} style={{ padding: '2px 0' }}>
                        <Button
                          size="small"
                          variant="contained"
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
              </div>

              <div style={{ paddingBottom: 10 }}>
                <ApproveQuestion
                  hasPermissions={hasPermissions}
                  isApproved={isApproved}
                  id={question.id}
                  approval={question.approval}
                />
              </div>

              <EditButton question={question} user={user} classes={classes} />

              <div className="itemFooter">

                <div className={classes.credits}>
                  <Link
                    href={{
                      pathname: '/user',
                      query: { id: question.askedBy[0].id },
                    }}
                  >
                    <Avatar
                      alt={question.askedBy[0].display[0]}
                      src={question.askedBy[0].image}
                      className={classes.avatar}
                    />
                  </Link>

                  <div style={{ padding: '0 0 0 10px' }}>
                    Asked by{' '}
                    <Link
                      href={{
                        pathname: '/user',
                        query: { id: question.askedBy[0].id },
                      }}
                    >
                      <a className={classes.nameLink}>{question.askedBy[0].display}</a>
                    </Link>{' '}
                    on <span>{format(parseISO(createdAt), 'MMMM dd, yyyy')}</span>
                  </div>
                </div>


                <Tooltip title={`${question.views} views`} placement="top">
                  <div className="viewContainer">
                    <Icon src="/static/visibility.svg" />
                    <span className={classes.viewsCount}>{`${question.views} ${
                      question.views > 1 ? 'views' : 'view'
                    }`}</span>
                  </div>
                </Tooltip>

              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default withRouter(withStyles(styles)(QuestionDetail))
