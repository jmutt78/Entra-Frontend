import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "./User";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

function push() {
  Router.push("/");
}

const Signout = props => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => (
      <Link href="/">
        <Button
          style={{ marginLeft: "2rem" }}
          color="default"
          onClick={e => signout(e, push)}
        >
          Sign Out
        </Button>
      </Link>
    )}
  </Mutation>
);
export default Signout;
