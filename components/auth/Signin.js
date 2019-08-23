import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation, withApollo } from 'react-apollo'
import Link from 'next/link'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import gql from 'graphql-tag'
import Error from './../ErrorMessage.js'
import { CURRENT_USER_QUERY } from './User'
import GoogleLoginButton from './GoogleLoginButton'
import FacebookLoginButton from './FacebookLoginButton'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

const styles = theme => ({
  container: {
    display: 'flex',
    width: '100%',
  },
  formContainer: {
    width: '100%',
    maxWidth: 1000,
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 500,
    padding: '50px 0 0 0',
  },
  inputField: {
    width: '100%',
    marginBottom: 30,
  },
  fieldset: {
    border: 0,
    padding: 0,
    margin: 0,
  },
  formControl: {
    width: '100%',
  },
  button: {
    marginBottom: theme.spacing.unit,
    backgroundColor: '#E27D60',
  },
  text: {
    marginBottom: 20,
  },

  signupPromptContainer: {
    width: '100%',
    backgroundColor: '#85BDCB',
    boxShadow: 'none',
    margin: '10px 0 30px 0',
    padding: '2px 0',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  signupButton: {
    backgroundColor: '#E27D60',
    marginLeft: theme.spacing.unit * 2,
  },
  signupText: {
    color: 'white',
    fontSize: 20,
  },
})

const SignupPrompt = ({ classes }) => {
  return (
    <AppBar className={classes.signupPromptContainer} position="static">
      <Toolbar className={classes.flexContainer}>
        <Typography className={classes.signupText}>Don't have an account?</Typography>
        <Link href="/signup">
          <Button size="medium" className={classes.signupButton}>
            SIGN UP NOW
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

class Signin extends Component {
  state = {
    name: '',
    password: '',
    email: '',
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const { classes } = this.props
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => (
          <div className={classes.formContainer}>
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault()
                await signup()

                this.setState({ name: '', email: '', password: '' })
                Router.push('/')
              }}
            >
              <fieldset
                disabled={loading}
                aria-busy={loading}
                style={{
                  borderWidth: '0px',
                  padding: '10px 0'
                }}
              >
                <Typography variant="h4" className={classes.text}>
                  Sign in
                </Typography>

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

                <div>
                  <Typography>
                    <Button size="large" className={classes.button} type="submit">
                      Log In!
                    </Button>

                    <Link href="/resetpage">
                      <a
                        style={{
                          textDecoration: 'none',
                          color: 'grey',
                          marginLeft: 150,
                        }}
                      >
                        FORGOT PASSWORD?
                      </a>
                    </Link>
                  </Typography>
                </div>
              </fieldset>
              <div style={{
                padding: '30px 0 0 0'
              }}>
                <GoogleLoginButton />
                <FacebookLoginButton />
                <SignupPrompt classes={classes} />
              </div>

            </form>
          </div>
        )}
      </Mutation>
    )
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withApollo(Signin))
