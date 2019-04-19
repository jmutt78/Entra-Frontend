import React, { Component } from "react";
import { Mutation } from "react-apollo";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import Error from "./../ErrorMessage.js";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class ResetPassword extends Component {
  state = {
    email: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => (
          <div style={{ width: "50%", margin: "0 auto", padding: "50px" }}>
            <form
              align="center"
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await reset();
                this.setState({ email: "" });
              }}
            >
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Reset Password</h2>
                <Error error={error} />
                {!error && !loading && called && (
                  <p>Success! Check your email for a reset link!</p>
                )}
                <label htmlFor="email">
                  <TextField
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <div>
                  <Button type="submit">Reset Password!</Button>
                </div>
              </fieldset>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default ResetPassword;
