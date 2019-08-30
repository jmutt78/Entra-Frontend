import React from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const LINKEDIN_LOGIN_MUTATION = gql`
  mutation LINKEDIN_LOGIN_MUTATION($code: String!) {
    linkedinLogin(code: $code) {
      id
      email
      name
    }
  }
`;

const styles = theme => ({
  container: {
    display: "flex",
    flex: 1,
    width: "100%",
    justifyContent: "center"
  }
});

class LinkedinRedirect extends React.Component {
  componentDidMount() {
    this.props.client
      .mutate({
        mutation: LINKEDIN_LOGIN_MUTATION,
        variables: {
          code: this.props.query.code
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
      })
      .then(() => {
        Router.push("/all");
      });
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <CircularProgress style={{ marginTop: 50 }} />
      </div>
    );
  }
}

export default withStyles(styles)(withApollo(LinkedinRedirect));
