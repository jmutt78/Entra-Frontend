import React, { Component } from 'react'
import { format, parseISO } from 'date-fns'
import { Query } from 'react-apollo'
import Link from 'next/link'
import NoQuestion from './NoQuestion'

import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { withApollo } from 'react-apollo'
import Icon from '../ui/Icon'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import { CURRENT_USER_QUERY } from '../auth/User'

const styles = theme => ({
  bigAvatar: {
    width: 70,
    height: 70,
    cursor: 'pointer',
  },
  grid: {
    margin: theme.spacing.unit,
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40,
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
  },
  photoTitle: {
    display: 'inline-flex',
    marginRight: 10,
    marginBottom: 20,
  },
  paper: {
    backgroundColor: '#F2F4EF',
    padding: 30,
  },
  tags: {
    display: 'inline-flex',
    marginRight: 10,
    marginTop: 20,
  },
  date: {
    marginTop: 20,
  },
  description: {
    fontSize: 17,
    minHeight: 20,
  },
  buttonTop: {
    backgroundColor: '#E27D60',
    marginLeft: theme.spacing.unit * 2,
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

const PromptBar = ({ classes }) => {
  return (
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

class NoUserQuestion extends Component {
  tagsList(tags, classes) {
    return tags.map(tags => (
      <div key={tags.id} className={classes.tags}>
        <Typography style={{ textTransform: 'uppercase' }}>
          <strong>{tags.name} </strong>
        </Typography>
      </div>
    ))
  }
  handleImage(askedby, classes) {
    if (askedby.image == null || askedby.image == '') {
      return (
        <div>
          <Link
            href={{
              pathname: '/user',
              query: { id: askedby.id },
            }}
          >
            <Avatar className={classes.bigAvatar}>{askedby.name[0]}</Avatar>
          </Link>
        </div>
      )
    }

    return (
      <div>
        <Link
          href={{
            pathname: '/user',
            query: { id: askedby.id },
          }}
        >
          <Avatar alt="Remy Sharp" src={askedby.image} className={classes.bigAvatar} />
        </Link>
      </div>
    )
  }

  render() {
    const { classes, question } = this.props
    const askedby = question.askedBy[0]

    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>

          const isApproved = question.approval === true

          if (!isApproved) {
            return <NoQuestion />
          }
          return (
            <div className={classes.container}>
              <PromptBar classes={classes} />

              <Paper className={classes.paper}>
                <Typography className={classes.title} variant="h5">
                  <strong>{question.title}</strong>
                </Typography>
                <div className={classes.photoTitle}>
                  {this.handleImage(askedby, classes)}
                  <Typography style={{ paddingTop: 20, marginLeft: 10 }}>
                    {' '}
                    <strong>{askedby.display}</strong> asks:
                  </Typography>
                </div>
                <Grid container>
                  <Grid item xs={10}>
                    <Typography className={classes.description}>{question.description} </Typography>
                    <Grid container direction="row" justify="space-between" className={classes.date}>
                      <Typography>Posted {format(parseISO(question.createdAt), 'MMMM dd, yyyy')}</Typography>
                    </Grid>
                    <Typography style={{ display: 'inline-flex', marginRight: 10 }}>
                      <strong> Tags:</strong>
                    </Typography>{' '}
                    {this.tagsList(question.tags, classes)}
                  </Grid>
                  <Grid item xs={2} container>
                    <Grid item xs={4}>
                      <Icon src="/static/thumb_up.svg" />
                      <div>{question.upVotes}</div>
                    </Grid>
                    <Grid item xs={4}>
                      <Icon src="/static/thumb_down.svg" />
                      <div>{question.downVotes}</div>
                    </Grid>
                    <div>
                      <Grid container alignItems="center">
                        <Icon src="/static/visibility.svg" />{' '}
                        <span style={{ paddingLeft: 10 }}>{question.views} views</span>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(withApollo(NoUserQuestion))
