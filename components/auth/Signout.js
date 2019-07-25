import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import Router from "next/router";
import { CURRENT_USER_QUERY } from "./User";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

class Signout extends React.Component {
  handleSignout = async (e, signout) => {
    e.preventDefault();
    const res = await signout();

    console.log("Updated!!");
    Router.push({
      pathname: "/"
    });
  };
  render() {
    return (
      <Mutation
        mutation={SIGN_OUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signout, { error, loading }) => {
          return (
            <Typography onClick={e => this.handleSignout(e, signout)}>
              Sign Out
            </Typography>
          );
        }}
      </Mutation>
    );
  }
}

export default Signout;
