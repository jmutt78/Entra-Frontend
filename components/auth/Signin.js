import React, { Component } from "react";
import Router from "next/router";
import { Mutation } from "react-apollo";
import Link from "next/link";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 5
  },
  container: {
    display: "flex",

    width: 80
  },
  textField: {
    marginLeft: 15,
    marginRight: 15,
    width: 700,
    marginBottom: 30
  },
  smallField: {
    marginLeft: 0,
    marginRight: 15,
    width: 400,
    marginBottom: 30
  },
  top: {
    width: 400,
    backgroundColor: "#85BDCB",
    boxShadow: "none",
    marginBottom: theme.spacing.unit
  },
  button: {
    marginBottom: theme.spacing.unit
  },
  text: {
    color: "grey",
    marginBottom: theme.spacing.unit
  },
  buttonTop: {
    backgroundColor: "#E27D60",
    marginLeft: theme.spacing.unit * 2
  },
  textTop: {
    color: "white",
    fontSize: 20
  }
});

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
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={4} />
            <Grid item xs={5}>
              <form
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  await signup();

                  this.setState({ name: "", email: "", password: "" });
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
                  <AppBar className={classes.top} position="static">
                    <Toolbar>
                      <Typography className={classes.textTop}>
                        Don't have an account?
                      </Typography>
                      <Link href="/signup">
                        <Button size="medium" className={classes.buttonTop}>
                          SIGN UP NOW
                        </Button>
                      </Link>
                    </Toolbar>
                  </AppBar>
                  <Error error={error} />
                  <Typography variant="h4" className={classes.text}>
                    Login
                  </Typography>
                  <label htmlFor="email">
                    <TextField
                      type="email"
                      name="email"
                      placeholder="email"
                      variant="filled"
                      value={this.state.email}
                      className={classes.smallField}
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
                      className={classes.smallField}
                    />
                  </label>
                  <div>
                    <Typography>
                      <Button type="submit" size="large" variant="outlined">
                        Log In!
                      </Button>
                      <Link href="/resetpage">
                        <a
                          style={{
                            textDecoration: "none",
                            color: "grey",
                            marginLeft: 150
                          }}
                        >
                          FORGOT PASSWORD?
                        </a>
                      </Link>
                    </Typography>
                    <div />
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

Signin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signin);
