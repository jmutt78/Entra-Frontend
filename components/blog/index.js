import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";

import gql from "graphql-tag";
import { format, parseISO } from "date-fns";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Error from "../ErrorMessage";
import Head from "next/head";

const BLOG_QUERY = gql`
  query BLOG_QUERY($id: ID!) {
    post(id: $id) {
      id
      title
      content
      date
      slug
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
  }
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
          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={6} className={classes.grid}>
                <Typography variant="body" color="textSecondary" component="p">
                  <div
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
