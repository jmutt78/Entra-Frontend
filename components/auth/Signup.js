import React, { Component } from "react";
import Router from "next/router";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Error from "./../ErrorMessage.js";
import { CURRENT_USER_QUERY } from "./User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $display: String!
  ) {
    signup(email: $email, name: $name, password: $password, display: $display) {
      id
      email
      name
      display
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

  smallField: {
    marginLeft: 0,
    marginRight: 0,
    width: 500,
    marginBottom: 30
  },

  button: {
    marginBottom: theme.spacing.unit,
    backgroundColor: "#E27D60"
  },
  text: {
    marginBottom: 20
  }
});

class Signup extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    display: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={4} />
            <Grid item xs={5}>
              <form
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  await signup();
                  this.setState({
                    name: "",
                    password: "",
                    email: "",
                    display: ""
                  });
                  Router.push("/");
                }}
              >
                <fieldset
                  disabled={loading}
                  aria-busy={loading}
                  style={{
                    borderWidth: "0px"
                  }}
                >
                  <Typography variant="h4" className={classes.text}>
                    Sign up for an account
                  </Typography>
                  <Error error={error} />
                  <label htmlFor="name">
                    <TextField
                      type="text"
                      name="name"
                      placeholder="name"
                      value={this.state.name}
                      onChange={this.saveToState}
                      variant="filled"
                      className={classes.smallField}
                    />
                  </label>
                  <label htmlFor="email">
                    <TextField
                      type="email"
                      name="email"
                      placeholder="email"
                      variant="filled"
                      value={this.state.email}
                      onChange={this.saveToState}
                      className={classes.smallField}
                    />
                  </label>

                  <label htmlFor="display name">
                    <TextField
                      type="text"
                      name="display"
                      placeholder="display name"
                      variant="filled"
                      value={this.state.display}
                      onChange={this.saveToState}
                      className={classes.smallField}
                    />
                  </label>
                  <label htmlFor="password">
                    <TextField
                      type="password"
                      name="password"
                      variant="filled"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.saveToState}
                      className={classes.smallField}
                    />
                  </label>

                  <div>
                    <Button
                      size="large"
                      className={classes.button}
                      type="submit"
                    >
                      Sign Up!
                    </Button>
                  </div>
                </fieldset>
              </form>
              <Grid xs={2} />
            </Grid>
          </Grid>
        )}
      </Mutation>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
