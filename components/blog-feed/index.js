import Link from 'next/link'
import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { format, parseISO } from 'date-fns'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Error from '../ErrorMessage.js'

// TODO: pagination
// TODO: tags
// TODO: search
// TODO: add slug for seo

export const BLOG_LIST_QUERY = gql`
  query {
    posts {
      edges {
        node {
          id
          slug
          title
          excerpt
          date
          featuredImage {
            id
            sourceUrl
          }
        }
      }
    }
  }
`

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  root: {
    margin: theme.spacing(1),
    marginTop: 40,
  },
  card: {
    maxWidth: 1000,
    margin: theme.spacing(5),
    cursor: 'pointer',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
})

class Blogs extends Component {
  render() {
    const { classes } = this.props
    return (
      <Query query={BLOG_LIST_QUERY} context={{ clientName: 'second' }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <Error error={error} />
          const posts = data.posts.edges
          return (
            <div className={classes.container}>
              {posts.map(post => {
                return (
                  <div key={post.node.id}>
                    <Link
                      href={{
                        pathname: '/post',
                        query: { id: post.node.id },
                      }}
                    >
                      <Card className={classes.card}>
                        <CardHeader
                          avatar={
                            <Avatar
                              aria-label="Recipe"
                              className={classes.avatar}
                              src="/static/Screen Shot 2019-07-17 at 2.47.56 PM.jpg"
                            />
                          }
                          title={post.node.title}
                          subheader={format(parseISO(post.node.date), 'MMMM dd, yyyy')}
                        />
                        <CardMedia
                          className={classes.media}
                          image={post.node.featuredImage.sourceUrl}
                          title="Paella dish"
                        />
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: post.node.excerpt,
                              }}
                            />
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary">
                            Read More
                          </Button>
                        </CardActions>
                      </Card>
                    </Link>
                  </div>
                )
              })}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(Blogs)
