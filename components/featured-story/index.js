import React, { Component } from 'react';

import { Query } from 'react-apollo';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

import Error from '../ErrorMessage.js';

import { BLOG_LIST_QUERY } from '../blog-feed/index.js';

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
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    marginTop: '-5px'
  },
  excerpt: {
    fontSize: '.75rem'
  },
  buttonText: {
    fontSize: '.75rem',
    cursor: 'pointer'
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 15px 15px 0'
  }
});

const titleProps = {
  style: {
    fontSize: '1rem'
  }
};
const dateProps = {
  style: {
    fontSize: '1rem'
  }
};

class BlogFeatured extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query
        query={BLOG_LIST_QUERY}
        context={{ clientName: 'second' }}
        variables={{
          categoryId: 67,
          first: 1
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;

          const post = data.posts.edges[0];

          return (
            <div>
              <Link
                href={{
                  pathname: '/post',
                  query: { id: post.node.id }
                }}
              >
                <Card className="card">
                  <CardHeader
                    avatar={
                      <div className="postAvatar">
                        <Avatar
                          aria-label="Recipe"
                          className={classes.avatarInner}
                          src="/static/square_logo.png"
                        />
                      </div>
                    }
                    title={post.node.title}
                    subheaderTypographyProps={dateProps}
                    titleTypographyProps={titleProps}
                    subheader={format(
                      parseISO(post.node.date),
                      'MMMM dd, yyyy'
                    )}
                  />
                  <CardMedia
                    className={classes.media}
                    image={post.node.featuredImage.sourceUrl}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className={classes.excerpt}
                      dangerouslySetInnerHTML={{
                        __html: post.node.excerpt
                      }}
                    ></Typography>
                  </CardContent>
                  <CardActions>
                    <Typography
                      component="div"
                      className={classes.buttonContainer}
                    >
                      <Button size="small" color="primary">
                        <span className={classes.buttonText}>Read More</span>
                      </Button>
                    </Typography>
                  </CardActions>
                </Card>
              </Link>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(BlogFeatured);
