import React, { Component } from "react";
import { Mutation } from "react-apollo";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import Error from "./../ErrorMessage.js";

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
  },
  secondText: {
    marginBottom: 20,
    fontSize: 17,
    marginRight: 190,
    color: "grey"
  }
});

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
    const { classes } = this.props;
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => (
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={4} />
            <Grid item xs={5}>
              <form
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  await reset();
                  this.setState({ email: "" });
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
                    Reset Password
                  </Typography>
                  <Typography className={classes.secondText}>
                    Enter your email address to recieve a link to rest your
                    password.
                  </Typography>

                  <Error error={error} />
                  {!error && !loading && called && (
                    <p>Success! Check your email for a reset link!</p>
                  )}
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
                  <div>
                    <Button
                      size="large"
                      className={classes.button}
                      type="submit"
                    >
                      Send Reset Password Link
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

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResetPassword);
