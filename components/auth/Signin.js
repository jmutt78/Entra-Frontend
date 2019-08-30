import React, { Component } from "react";
import Router from "next/router";
import gql from "graphql-tag";
import { Mutation, withApollo } from "react-apollo";
import Link from "next/link";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Error from "./../ErrorMessage.js";
import { CURRENT_USER_QUERY } from "./User";
import GoogleLoginButton from "./GoogleLoginButton";
import FacebookLoginButton from "./FacebookLoginButton";
import LinkedinLoginButton from "./LinkedinLoginButton";

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontSize: "40px",
    textAlign: "Left",
    color: "rgba(0, 0, 0, 0.87)"
  },
  formContainer: {
    width: "100%",
    maxWidth: 1000,
    display: "flex",
    justifyContent: "center",
    padding: "60px 0 20px 0"
  },
  form: {
    width: "100%",
    maxWidth: 500,
    padding: "50px 0 0 0"
  },
  inputField: {
    width: "100%",
    marginBottom: 30
  },
  fieldset: {
    border: 0,
    padding: 0,
    margin: 0
  },
  formControl: {
    width: "100%"
  },
  button: {
    marginBottom: theme.spacing(1),
    backgroundColor: "#E27D60"
  },
  signupPromptContainer: {
    width: "100%",
    backgroundColor: "#85BDCB",
    boxShadow: "none",
    margin: "10px 0 30px 0",
    padding: "2px 0"
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between"
  },

  signupButton: {
    backgroundColor: "#E27D60",
    marginLeft: theme.spacing(2)
  },
  signupText: {
    color: "white",
    fontSize: 20
  }
});

export const SignupPrompt = ({ classes }) => {
  return (
    <AppBar className={classes.signupPromptContainer} position="static">
      <Toolbar className={classes.flexContainer}>
        <Typography className={classes.signupText}>
          Don't have an account?
        </Typography>
        <Link href="/signup">
          <Button size="medium" className={classes.signupButton}>
            SIGN UP NOW
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

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
    const { classes } = this.props;
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <Grid container className={classes.container}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h3" className={classes.title}>
                      Sign In
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
            <div className={classes.formContainer}>
              <form
                method="post"
                className="signin-form"
                onSubmit={async e => {
                  e.preventDefault();
                  await signup();

                  this.setState({ name: "", email: "", password: "" });
                  Router.push("/all");
                }}
              >
                <fieldset
                  disabled={loading}
                  aria-busy={loading}
                  style={{
                    borderWidth: "0px",
                    padding: "10px 0"
                  }}
                >
                  <Error error={error} />

                  <label htmlFor="email">
                    <TextField
                      type="email"
                      name="email"
                      placeholder="email"
                      variant="filled"
                      value={this.state.email}
                      className={classes.inputField}
                      onChange={this.saveToState}
                    />
                  </label>
                  <label htmlFor="password">
                    <TextField
                      type="password"
                      name="password"
                      placeholder="password"
                      variant="filled"
                      value={this.state.password}
                      onChange={this.saveToState}
                      className={classes.inputField}
                    />
                  </label>

                  <Typography
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Link href="/resetpage">
                      <a
                        style={{
                          textDecoration: "none",
                          color: "grey",
                          paddingBottom: 10
                        }}
                      >
                        FORGOT PASSWORD?
                      </a>
                    </Link>
                    <Button
                      size="large"
                      className={classes.button}
                      type="submit"
                    >
                      Log In!
                    </Button>
                  </Typography>
                </fieldset>
                <div
                  style={{
                    padding: "40px 0 0 0"
                  }}
                >
                  <GoogleLoginButton />
                  <FacebookLoginButton />
                  <LinkedinLoginButton />
                  <SignupPrompt classes={classes} />
                </div>
              </form>
            </div>
          </Grid>
        )}
      </Mutation>
    );
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withApollo(Signin));
