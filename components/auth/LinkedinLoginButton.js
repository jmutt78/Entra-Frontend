import React from "react";
import { withApollo } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";

const LINKEDIN_LOGIN_MUTATION = gql`
  mutation LINKEDIN_LOGIN_MUTATION($name: String!, $email: String!) {
    linkedinLogin(name: $name, email: $email) {
      id
      email
      name
    }
  }
`;

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    margin: "10px 0"
  }
});

class LinkedinLoginButton extends React.Component {
  onSuccess = response => {
    this.props.client
      .mutate({
        mutation: LINKEDIN_LOGIN_MUTATION,
        variables: {
          name: response.name,
          email: response.email
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
      })
      .then(() => {
        Router.push("/");
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <button>Login with Linkedin</button>
      </div>
    );
  }
}

export default withStyles(styles)(withApollo(LinkedinLoginButton));
