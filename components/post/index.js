import React, { Component } from "react";
import { Query } from "react-apollo";

import gql from "graphql-tag";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

import Error from "../ErrorMessage";

export const BLOG_QUERY = gql`
  query BLOG_QUERY($id: ID!) {
    post(id: $id) {
      id
      title
      content
      date
      slug
      author {
        id
        name
      }
      featuredImage {
        id
        sourceUrl
      }
    }
  }
`;

const styles = theme => ({
  grid: {
    margin: theme.spacing(1)
  },
  root: {
    margin: theme.spacing(1),
    marginTop: 40
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    color: "#343434",
    flexGrow: 1,
    textAlign: "center"
  },
  content: {
    maxWidth: "100%",
    alignItems: "left"
  },
  featured: { width: "800px", maxWidth: "100%", flexGrow: 1 }
});

class DisplayBlog extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Query
        query={BLOG_QUERY}
        context={{ clientName: "second" }}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          const { post } = data;
          function createMarkup() {
            return { __html: createMarkup() };
          }
          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={3} />

              <Grid item xs={6} className={classes.grid}>
                <Error error={error} />
                <Typography className={classes.title} variant="h2">
                  {post.title}
                </Typography>
                <Typography className={classes.title}>
                  by {post.author.name}
                </Typography>
                <CardMedia>
                  <img
                    className={classes.featured}
                    src={post.featuredImage.sourceUrl}
                  />
                </CardMedia>
                <Typography variant="h6" color="textSecondary" display="block" component={'div'}>
                  <div
                    className={classes.content}
                    dangerouslySetInnerHTML={{
                      __html: post.content
                    }}
                  />
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(DisplayBlog);
