import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Error from "./../ErrorMessage.js";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $displayName: String!
  ) {
    signup(
      email: $email
      name: $name
      password: $password
      displayName: $displayName
    ) {
      id
      email
      name
      displayName
    }
  }
`;

class Signup extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    displayName: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => (
          <div style={{ width: "40%", margin: "0 auto", padding: "50px" }}>
            <form
              align="center"
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await signup();
                this.setState({
                  name: "",
                  email: "",
                  password: "",
                  displayName: ""
                });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign Up!</h2>
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
                <label htmlFor="name">
                  <TextField
                    type="text"
                    name="name"
                    placeholder="name"
                    value={this.state.name}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="display name">
                  <TextField
                    type="text"
                    name="displayName"
                    placeholder="display name"
                    value={this.state.displayName}
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
                  <Button type="submit">Sign Up!</Button>
                </div>
              </fieldset>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Signup;
