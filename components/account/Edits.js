import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Error from "./../ErrorMessage.js";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $email: String!
    $name: String!
    $display: String!
    $location: String
    $about: String
    $industry: String
    $categories: String
    $image: String
  ) {
    updateUser(
      id: $id
      email: $email
      name: $name
      display: $display
      location: $location
      about: $about
      industry: $industry
      categories: $categories
      image: $image
    ) {
      id
      email
      display
      name
      createdAt
      updatedAt
      location
      about
      industry
      categories
      image
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
  },

  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  button: {
    marginBottom: theme.spacing.unit
  }
});

class UpdateUser extends Component {
  state = {
    name: this.props.data.me.name,
    email: this.props.data.me.email,
    display: this.props.data.me.display
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateUser = async (e, id, updateUserMutation) => {
    e.preventDefault();
    console.log("Updating Item!!");
    const res = await updateUserMutation({
      variables: {
        id,
        ...this.state
      }
    });
    console.log("Updated!!");
  };

  uploadFile = async e => {
    console.log("uploading file...");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "EntraAccountPhoto");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/docusite/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();

    this.setState({
      image: file.secure_url
    });
  };

  returnblank(item) {
    if (item == null) {
      return "";
    } else {
      return item;
    }
  }

  handleImage(user, classes) {
    if (user.image == null || user.image == "") {
      return (
        <div>
          <Avatar className={classes.bigAvatar}>{user.name[0]}</Avatar>
        </div>
      );
    }
    return (
      <div>
        <Avatar
          alt="Remy Sharp"
          src={user.image}
          className={classes.bigAvatar}
        />
      </div>
    );
  }

  render() {
    const user = this.props.data.me;
    const id = this.props.data.me.id;
    const { classes } = this.props;
    return (
      <Mutation mutation={UPDATE_USER_MUTATION} variables={this.state}>
        {(updateUser, { loading, error }) => (
          <div style={{ width: "40%", margin: "0 auto", padding: "50px" }}>
            <form onSubmit={e => this.updateUser(e, id, updateUser)}>
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Edit Profile</h2>
                <label htmlFor="email">
                  <TextField
                    label="email"
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    onChange={this.handleChange}
                    className={classes.textField}
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
                  />
                </label>
                <label htmlFor="display name">
                  <TextField
                    label="display name"
                    type="text"
                    name="display"
                    defaultValue={user.display}
                    onChange={this.handleChange}
                    className={classes.textField}
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
                  />
                </label>
                <label htmlFor="about me">
                  <TextField
                    label="about me"
                    type="text"
                    name="about"
                    defaultValue={this.returnblank(user.about)}
                    onChange={this.handleChange}
                    className={classes.textField}
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
                  />
                </label>
                {this.handleImage(user, classes)}
                <div>
                  <input
                    accept="image/*"
                    className={classes.input}
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={this.uploadFile}
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      component="span"
                      className={classes.button}
                      size="small"
                    >
                      Upload New{" "}
                      <CloudUploadIcon className={classes.rightIcon} />
                    </Button>
                  </label>
                </div>
                <div>
                  <Button variant="contained" type="submit">
                    Sav{loading ? "ing" : "e"} Changes
                  </Button>
                </div>
              </fieldset>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

UpdateUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UpdateUser);
export { UPDATE_USER_MUTATION };
