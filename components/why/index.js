import React, { Component } from "react";
import { Query } from "react-apollo";

import gql from "graphql-tag";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Error from "../ErrorMessage";

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
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          const { page } = data;

          function createMarkup() {
            return { __html: createMarkup() };
          }
          return (
            <div className={classes.root}>
              <div className={classes.container}>
                <Error error={error} />

                <Typography className={classes.title} variant="h2">
                  {page.title}
                </Typography>

                <Typography variant="h6" color="textSecondary" display="block">
                  <div
                    className={classes.content}
                    dangerouslySetInnerHTML={{
                      __html: page.content
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

export default withStyles(styles)(Why);
