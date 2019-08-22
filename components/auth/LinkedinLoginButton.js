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
    backgroundColor: "#337ab7",
    borderColor: "#2e6da4"
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
        <img src="/static/linkedin.png" alt="Login with Linkedin" />
      </div>
    );
  }
}

export default withStyles(styles)(withApollo(LinkedinLoginButton));
