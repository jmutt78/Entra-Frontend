import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'

import Button from '@material-ui/core/Button'
import Error from './../ErrorMessage.js'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '-15px',
    padding: '0 5px',
  },
  successText: {
    color: '#2d3436', //theme.palette.accent.dark,
    fontSize: '1.2rem',
    padding: '0 10px 25px 0',
  },
  text: {
    color: '#2d3436', //theme.palette.accent.dark,
    fontSize: '1.2rem',
    padding: '0 10px 28px 10px',
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  inputField: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    marginLeft: 10,
    marginBotom: 10,
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
  fieldset: {
    border: 0,
    padding: 0,
    margin: 0,
  },
  formControl: {
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
})

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`

class ResetPassword extends Component {
  state = {
    email: '',
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const { classes } = this.props
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => (
          <Grid container className={classes.container}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" className={classes.title}>
                      Request Password Reset
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>

            <div className={classes.formContainer}>
              <form
                method="post"
                onSubmit={async e => {
                  e.preventDefault()
                  await reset()
                  this.setState({ email: '' })
                }}
                className={classes.form}
              >
                <fieldset
                  className={classes.fieldset}
                  disabled={loading}
                  aria-busy={loading}
                >
                  <Typography className={classes.text}>
                    Enter your email address to recieve a link to rest your password.
                  </Typography>

                  <Error error={error} styles={{padding: 0, margin: 0}}/>
                  {!error && !loading && called && (
                    <Typography className={classes.successText} style={{ color: '#27ae60' }}>
                      Success! Check your email for a reset link!
                    </Typography>
                  )}
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

                  <div className={classes.buttonContainer}>
                    <Button variant="contained" type="submit">
                      Send Reset Password Link
                    </Button>
                  </div>
                </fieldset>
              </form>
            </div>
          </Grid>
        )}
      </Mutation>
    )
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ResetPassword)
