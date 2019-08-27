import React, { Component } from "react";
import { Query } from "react-apollo";

import gql from "graphql-tag";
import { format, parseISO } from "date-fns";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Error from "../ErrorMessage";
import Head from "next/head";

export const WHY_QUERY = gql`
  query WHY_QUERY($id: ID!) {
    page(id: $id) {
      content
      title
      id
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

class Why extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Query
        query={WHY_QUERY}
        variables={{
          id: "cGFnZToyMTAw"
        }}
        context={{ clientName: "second" }}
      >
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const { page } = data;

          function createMarkup() {
            return { __html: createMarkup() };
          }
          return (
            <Grid container className={classes.root} spacing={16}>
              <Grid item xs={3} />

              <Grid item xs={6} className={classes.grid}>
                <Typography className={classes.title} variant="h2">
                  {page.title}
                </Typography>

                <Typography
                  variant="h6"
                  color="textSecondary"
                  display="block"
                  component={"div"}
                >
                  <div
                    className={classes.content}
                    dangerouslySetInnerHTML={{
                      __html: page.content
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

export default withStyles(styles)(Why);
