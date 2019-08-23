import { Query, Mutation } from "react-apollo";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";
import Error from "./../ErrorMessage.js";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const possiblePermissions = ["ADMIN", "USER", "MODERATOR", "PERMISSIONUPDATE"];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      display
      email
    }
  }
`;

export const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      display
      permissions
    }
  }
`;

const styles = theme => ({
  root: {
    width: "80%",
    margin: theme.spacing(15),
    padding: theme.spacing(1),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

class Permissions extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;

          return (
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Dispaly</TableCell>
                    <TableCell>Email</TableCell>
                    {possiblePermissions.map(permission => (
                      <TableCell key={permission}>{permission}</TableCell>
                    ))}
                    <TableCell>👇🏻</TableCell>
                  </TableRow>
                </TableHead>

                {data.users.map(users => (
                  <UserPermissions user={users} key={users.id} />
                ))}
              </Table>
            </Paper>
          )
        }}
      </Query>
    );
  }
}

export class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array
    }).isRequired
  };
  state = {
    permissions: this.props.user.permissions
  };

  handlePermissionChange = e => {
    const checkbox = e.target;
    // take a copy of the current permissions
    let updatedPermissions = [...this.state.permissions];
    // figure out if we need to remove or add this permission
    if (checkbox.checked) {
      // add it in!
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        permission => permission !== checkbox.value
      );
    }
    this.setState({ permissions: updatedPermissions });
  };

  render() {
    const user = this.props.user;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: this.props.user.id
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <TableBody>
            <TableRow>
              <TableCell>{user.display}</TableCell>
              <TableCell>{user.email}</TableCell>
              {possiblePermissions.map(permission => (
                <TableCell align="center" key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.permissions.includes(permission)}
                          value={permission}
                          onChange={this.handlePermissionChange}
                        />
                      }
                    />
                  </label>
                </TableCell>
              ))}
              <TableCell align="left">
                <Button disabled={loading} onClick={updatePermissions}>
                  Updat{loading ? "ing" : "e"}
                </Button>
              </TableCell>
            </TableRow>
            <Error error={error} />
          </TableBody>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(Permissions);
