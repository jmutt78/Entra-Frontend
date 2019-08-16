import React from "react";
import { withApollo } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";
import gql from "graphql-tag";
import FacebookLogin from "react-facebook-login";
import { withStyles } from "@material-ui/core/styles";

const FACEBOOK_LOGIN_MUTATION = gql`
  mutation FACEBOOK_LOGIN_MUTATION($name: String!, $email: String!) {
    facebookLogin(name: $name, email: $email) {
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
    width: 400
  }
});

class FacebookLoginButton extends React.Component {
  responseFacebook = response => {
    this.props.client
      .mutate({
        mutation: FACEBOOK_LOGIN_MUTATION,
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
        <FacebookLogin
          appId={process.env.FACEBOOK_APP_ID}
          fields="name,email,picture"
          callback={this.responseFacebook}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withApollo(FacebookLoginButton));
