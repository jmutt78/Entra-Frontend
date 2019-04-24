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
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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

    width: 80
  },
  textField: {
    marginLeft: 15,
    marginRight: 15,
    width: 700,
    marginBottom: 30
  },
  smallField: {
    marginLeft: 15,
    marginRight: 15,
    width: 330,
    marginBottom: 30
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
  },
  text: {
    margin: 10
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
    console.log(this.props.data.me.image);
    console.log("Updating Item!!");

    const res = await updateUserMutation({
      variables: {
        id,
        ...this.state
      }
    });

    console.log("Updated!!");
  };

  uploadFile = async (e, userImageUrl) => {
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
    console.log(file);
    this.setState({
      image: file.secure_url
    });
    console.log("uploaded");
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
  uploadMessage(image) {
    if (image == null || image == "") {
      return <div />;
    }
    return (
      <div>
        <p>Image Uploaded! Please Save Changes</p>
      </div>
    );
  }

  render() {
    const user = this.props.data.me;
    const id = this.props.data.me.id;
    const image = this.state.image;
    const userImageUrl = this.props.data.me.image;
    const { classes } = this.props;
    return (
      <Mutation mutation={UPDATE_USER_MUTATION} variables={this.state}>
        {(updateUser, { loading, error }) => (
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={3} />
            <Grid item xs={5}>
              <form onSubmit={e => this.updateUser(e, id, updateUser)}>
                <Error error={error} />
                <fieldset
                  disabled={loading}
                  aria-busy={loading}
                  style={{
                    borderWidth: "0px"
                  }}
                >
                  <Typography variant="h4" className={classes.text}>
                    Edit Your Profile
                  </Typography>
                  <label htmlFor="name">
                    <TextField
                      label="name"
                      type="text"
                      name="name"
                      variant="filled"
                      defaultValue={user.name}
                      onChange={this.handleChange}
                      className={classes.smallField}
                    />
                  </label>
                  <label htmlFor="email">
                    <TextField
                      label="email"
                      type="email"
                      name="email"
                      variant="filled"
                      defaultValue={user.email}
                      onChange={this.handleChange}
                      className={classes.smallField}
                    />
                  </label>

                  <Typography variant="h5" className={classes.text}>
                    Community Profile Information
                  </Typography>
                  <label htmlFor="display name">
                    <TextField
                      label="display name"
                      type="text"
                      name="display"
                      variant="filled"
                      defaultValue={user.display}
                      onChange={this.handleChange}
                      className={classes.smallField}
                    />
                  </label>
                  <label htmlFor="location">
                    <TextField
                      label="location"
                      type="text"
                      name="location"
                      variant="filled"
                      defaultValue={this.returnblank(user.location)}
                      onChange={this.handleChange}
                      className={classes.smallField}
                    />
                  </label>
                  <label htmlFor="about me">
                    <TextField
                      label="about me"
                      type="text"
                      name="about"
                      rowsMax="4"
                      rows="6"
                      multiline
                      variant="filled"
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
                      variant="filled"
                      defaultValue={this.returnblank(user.industry)}
                      onChange={this.handleChange}
                      className={classes.textField}
                    />
                  </label>

                  <Typography variant="h6" className={classes.text}>
                    Edit Profile Image
                  </Typography>

                  {this.handleImage(user, classes)}
                  <div>
                    <input
                      accept="image/*"
                      className={classes.smallField}
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
                    {this.uploadMessage(image)}
                  </div>
                  <div>
                    <Button variant="contained" type="submit">
                      Sav{loading ? "ing" : "e"} Changes
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

UpdateUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UpdateUser);
export { UPDATE_USER_MUTATION };
