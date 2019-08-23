import React, { Component } from "react";
import { Mutation } from "react-apollo";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Error from "./../ErrorMessage.js";
import { CURRENT_USER_QUERY } from "./User";

export const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

const styles = theme => ({
  container: {
    display: "flex",

    width: 100
  },
  root: {
    marginTop: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 5
  },
  textField: {
    marginLeft: 0,
    marginRight: 0,
    width: 500,
    marginBottom: 30
  },
  smallField: {
    marginLeft: 0,
    marginRight: 0,
    width: 500,
    marginBottom: 30
  },

  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  button: {
    marginBottom: theme.spacing.unit,
    backgroundColor: "#E27D60"
  },
  text: {
    marginBottom: 20
  }
});

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired
  };
  state = {
    password: "",
    confirmPassword: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading, called }) => (
          <div style={{ width: "50%", margin: "0 auto", padding: "50px" }}>
            <Error error={error} />
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await reset();
                this.setState({ password: "", confirmPassword: "" });
              }}
            >
              <fieldset
                disabled={loading}
                aria-busy={loading}
                style={{
                  borderWidth: "0px"
                }}
              >
                <h2>Reset Password</h2>
                <Error error={error} />
                <label htmlFor="email">
                  <TextField
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="confirmPassword">
                  <TextField
                    type="password"
                    name="confirmPassword"
                    placeholder="confirmPassword"
                    value={this.state.confirmPassword}
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

Reset.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Reset);
