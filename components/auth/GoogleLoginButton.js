import React from "react";
import GoogleLogin from "react-google-login";
import { withApollo } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";

const GOOGLE_LOGIN_MUTATION = gql`
  mutation GOOGLE_LOGIN_MUTATION($name: String!, $email: String!) {
    googleLogin(name: $name, email: $email) {
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
    width: '100%',
    padding: "10px 0",
    background: '#4285F4',
    background: '#dedede',
    margin: '10px 0',
  }
});

class GoogleLoginButton extends React.Component {
  onSuccess = response => {
    this.props.client
      .mutate({
        mutation: GOOGLE_LOGIN_MUTATION,
        variables: {
          name: response.profileObj.name,
          email: response.profileObj.email
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
      })
      .then(() => {
        Router.push("/");
      });
  };
  onFailure = response => {
    console.log("failure", response);
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withApollo(GoogleLoginButton));
