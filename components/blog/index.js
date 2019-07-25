import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";

import gql from "graphql-tag";
import { format, parseISO } from "date-fns";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

import Error from "../ErrorMessage";
import Head from "next/head";
//// NOTE: margin for WP margin-left:-35px

const BLOG_QUERY = gql`
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
    margin: theme.spacing.unit
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  },
  title: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
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
    console.log(this.props.id);

    return (
      <Query
        query={BLOG_QUERY}
        context={{ clientName: "second" }}
        variables={{
          id: this.props.id
        }}
      >
        {({ data: { post }, loading }) => {
          console.log(post);
          if (loading) return <p>Loading...</p>;
          function createMarkup() {
            return { __html: createMarkup() };
          }
          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={3} />

              <Grid item xs={6} className={classes.grid}>
                <Typography className={classes.title} variant="h2" centered>
                  {post.title}
                </Typography>
                <Typography className={classes.title} variant="p" centered>
                  by {post.author.name}
                </Typography>
                <CardMedia>
                  <img
                    className={classes.featured}
                    src={post.featuredImage.sourceUrl}
                  />
                </CardMedia>
                <Typography variant="h6" color="textSecondary" display="block">
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
