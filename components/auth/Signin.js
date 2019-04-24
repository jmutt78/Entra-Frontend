import React, { Component } from "react";
import Router from "next/router";
import { Mutation } from "react-apollo";
import Link from "next/link";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import Error from "./../ErrorMessage.js";
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class Signin extends Component {
  state = {
    name: "",
    password: "",
    email: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <div style={{ width: "40%", margin: "0 auto", padding: "50px" }}>
            <form
              align="center"
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await signup();

                this.setState({ name: "", email: "", password: "" });
                Router.push("/");
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Log In!</h2>
                <Error error={error} />
                <label htmlFor="email">
                  <TextField
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  <TextField
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <div>
                  <Button type="submit">Log In!</Button>
                  <div>
                    <Link href="/resetpage">Reset Password</Link>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Signin;
