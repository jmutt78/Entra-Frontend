import React from "react";
import { withApollo } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import Linkedin from "./Linkedin";

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
    console.log(response, "onSuccess");
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
  onFailure = e => {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Linkedin
          clientId={process.env.LINKEDIN_CLIENT_ID}
          redirectUri="http://localhost:7777/signin"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          redirectPath="/signin"
        />
      </div>
    );
  }
}

export default withStyles(styles)(withApollo(LinkedinLoginButton));
