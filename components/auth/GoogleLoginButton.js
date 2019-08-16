import React from "react";
import GoogleLogin from "react-google-login";
import { withApollo } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";
import gql from "graphql-tag";

const GOOGLE_LOGIN_MUTATION = gql`
  mutation GOOGLE_LOGIN_MUTATION($name: String!, $email: String!) {
    googleLogin(name: $name, email: $email) {
      id
      email
      name
    }
  }
`;

class GoogleLoginButton extends React.Component {
  onSuccess = response => {
    console.log("success", response);
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
    return (
      <div>
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}

export default withApollo(GoogleLoginButton);
