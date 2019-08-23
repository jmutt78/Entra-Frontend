import React, { Component } from "react";
import Router from "next/router";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import Error from "./../ErrorMessage.js";
import { CURRENT_USER_QUERY } from "./User";

export const SIGNUP_MUTATION = gql`
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
    width: "100%",
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
    padding: "10px 0 20px 0"
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
          <div className={classes.container}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="display3" className={classes.title}>
                      Sign Up
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>

            <div className={classes.formContainer}>
              <form
                method="post"
                className={classes.form}
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
                  <Error error={error} />
                  <label htmlFor="name">
                    <TextField
                      type="text"
                      name="name"
                      placeholder="name"
                      value={this.state.name}
                      onChange={this.saveToState}
                      variant="filled"
                      className={classes.inputField}
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
                      className={classes.inputField}
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
                      className={classes.inputField}
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
                      className={classes.inputField}
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
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
