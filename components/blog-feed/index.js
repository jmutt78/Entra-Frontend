
import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Error from '../ErrorMessage.js'
import Post from './Post';


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
    padding: '2rem 0',
  },
  title: {
    fontSize: "40px",
    textAlign: "Left",
    color: "rgba(0, 0, 0, 0.87)",
    lineHeight: '3rem',
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
            <div>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" className={classes.title}>
                        Blog
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <div className={classes.container}>
                {posts.map(post => <Post post={post} key={post.node.id} />)}
              </div>
            </div>
          )

        }}
      </Query>
    )
  }
}

export default withStyles(styles)(Blogs)
