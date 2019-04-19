import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Error from "./../ErrorMessage.js";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      displayName
      location
      aboutMe
      industry
      permissions
      categories
    }
  }
`;

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: 80
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
    marginBottom: theme.spacing.unit
  }
});

// TODO: 3. create edit button for the input that will turn the input from readonly to write
// TODO: 4.  create mutation on the backend
// TODO: 5. create a mutation for each componenet that updates the user account r

class EditProfile extends Component {
  state = {
    readOnly: true
  };

  handleEditClick() {
    this.setState({ readOnly: !this.state.readOnly });
  }

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
  returnblank(item) {
    if (item == null) {
      return "";
    } else {
      return item;
    }
  }

  render() {
    console.log(this.state);
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          const user = data.me;
          const { classes } = this.props;

          return (
            <div style={{ width: "40%", margin: "0 auto", padding: "50px" }}>
              <form
                className={classes.container}
                noValidate
                autoComplete="off"
                method="post"
                onSubmit={async e => {
                  e.preventDefault();
                  await signup();
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <h2>My Profile</h2>
                  <label htmlFor="email">
                    <TextField
                      label="email"
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      onChange={this.handleChange}
                      className={classes.textField}
                      InputProps={this.state}
                    />
                  </label>
                  <label htmlFor="name">
                    <TextField
                      label="name"
                      type="text"
                      name="name"
                      defaultValue={user.name}
                      onChange={this.handleChange}
                      className={classes.textField}
                      InputProps={this.state}
                    />
                  </label>
                  <label htmlFor="display name">
                    <TextField
                      label="display name"
                      type="text"
                      name="displayname"
                      defaultValue={user.displayName}
                      onChange={this.handleChange}
                      className={classes.textField}
                      InputProps={this.state}
                    />
                  </label>
                  <label htmlFor="location">
                    <TextField
                      label="location"
                      type="text"
                      name="location"
                      defaultValue={this.returnblank(user.location)}
                      onChange={this.handleChange}
                      className={classes.textField}
                      InputProps={this.state}
                    />
                  </label>
                  <label htmlFor="about me">
                    <TextField
                      label="about me"
                      type="text"
                      name="aboutme"
                      defaultValue={this.returnblank(user.aboutMe)}
                      onChange={this.handleChange}
                      className={classes.textField}
                      InputProps={this.state}
                    />
                  </label>
                  <label htmlFor="industry">
                    <TextField
                      label="industry"
                      type="text"
                      name="industry"
                      multiline
                      rowsMax="4"
                      defaultValue={this.returnblank(user.industry)}
                      onChange={this.handleChange}
                      className={classes.textField}
                      InputProps={this.state}
                    />
                  </label>
                  <label htmlFor="categories">
                    <TextField
                      label="categories"
                      type="text"
                      name="categories"
                      defaultValue={this.returnblank(user.categories)}
                      onChange={this.handleChange}
                      className={classes.textField}
                      InputProps={this.state}
                    />
                  </label>
                  <Fab
                    color="secondary"
                    aria-label="Edit"
                    className={classes.fab}
                  >
                    <Icon>edit_icon</Icon>
                  </Fab>
                </fieldset>
              </form>
              <a
                role="button"
                title="Edit"
                onClick={this.handleEditClick.bind(this)}
              >
                ✏️
              </a>
            </div>
          );
        }}
      </Query>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(EditProfile);
