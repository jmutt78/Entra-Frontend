import React, { Component } from "react";
import { Query } from "react-apollo";

import gql from "graphql-tag";

import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";

import Error from "../ErrorMessage";
import "./index.css";

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
  root: {
    width: "100%",
    maxWidth: 1500,
    justifyContent: "center"
  },
  container: {
    maxWidth: 700,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 20px"
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
    alignItems: "left",
    color: theme.palette.accent.dark
  },
  featured: {
    width: "800px",
    maxWidth: "100%",
    flexGrow: 1
  }
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
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const { post } = data;

          function createMarkup() {
            return { __html: createMarkup() };
          }
          return (
            <div className={classes.root}>
              <div className={classes.container}>
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

                <Typography variant="h6" color="textSecondary" display="block">
                  <div
                    className={classes.content}
                    dangerouslySetInnerHTML={{
                      __html: post.content
                    }}
                  />
                </Typography>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(DisplayBlog);
