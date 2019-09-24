import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Error from '../ErrorMessage.js';
import Post from './Post';

export const BLOG_LIST_QUERY = gql`
  query BLOG_LIST_QUERY($first: Int, $categoryId: Int) {
    posts(first: $first, where: { categoryId: $categoryId }) {
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
`;

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '2rem 0'
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: '3rem'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
});

class Blogs extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query
        query={BLOG_LIST_QUERY}
        context={{ clientName: 'second' }}
        variables={{
          categoryId: this.props.categoryId
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const posts = data.posts.edges;
          return (
            <div style={{ maxWidth: '100vw' }}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" className={classes.title}>
                        {this.props.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <div className={classes.container}>
                {posts.map(post => (
                  <Post post={post} key={post.node.id} />
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(Blogs);
