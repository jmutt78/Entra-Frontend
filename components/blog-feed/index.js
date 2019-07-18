import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { format, parseISO } from "date-fns";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

// TODO: pagination
// TODO: tags
// TODO: search
// TODO: add slug for seo

const BLOG_LIST_QUERY = gql`
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
`;

const styles = theme => ({
  grid: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex",
    margin: theme.spacing.unit * 4
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  },
  card: {
    maxWidth: 2000,
    margin: theme.spacing.unit * 4
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

class Blogs extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={BLOG_LIST_QUERY} context={{ clientName: "second" }}>
        {({ data, loading }) => {
          const posts = data.posts.edges;
          if (loading) return <p>Loading...</p>;
          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={2} />
              <Grid item xs={6}>
                <Typography
                  variant="display3"
                  align="center"
                  className={classes.container}
                >
                  Our Blog
                </Typography>
                {posts.map(post => {
                  return (
                    <div key={post.node.id}>
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
                          subheader={format(
                            parseISO(post.node.date),
                            "MMMM dd, yyyy"
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
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: post.node.excerpt
                              }}
                            />
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Link
                            href={{
                              pathname: "/blog",
                              query: { id: post.node.id }
                            }}
                          >
                            <Button size="small" color="primary">
                              Read More
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    </div>
                  );
                })}
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(Blogs);
