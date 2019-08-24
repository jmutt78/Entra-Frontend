import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Error from './../ErrorMessage.js'
import { CURRENT_USER_QUERY } from './User'

export const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`

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

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  }
  state = {
    password: '',
    confirmPassword: '',
  }
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const { classes } = this.props

    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading, called }) => (
          <Grid container className={classes.container}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" className={classes.title}>
                      Reset your password
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
                  this.setState({ password: '', confirmPassword: '' })
                }}
                className={classes.form}
              >
                <fieldset className={classes.fieldset} disabled={loading} aria-busy={loading}>
                  <Error error={error} />

                  <label htmlFor="email">
                    <TextField
                      variant="filled"
                      type="password"
                      name="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.saveToState}
                      className={classes.inputField}
                    />
                  </label>
                  <label htmlFor="confirmPassword">
                    <TextField
                      variant="filled"
                      type="password"
                      name="confirmPassword"
                      placeholder="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.saveToState}
                      className={classes.inputField}
                    />
                  </label>

                  <div className={classes.buttonContainer}>
                    <Button variant="contained" type="submit">
                      Reset Password
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

Reset.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Reset)
