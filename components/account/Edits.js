import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Error from "./../ErrorMessage.js";
import Router from "next/router";
import FormControl from "@material-ui/core/FormControl";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { CURRENT_USER_QUERY } from "../auth/User";

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $email: String!
    $name: String!
    $display: String!
    $location: String
    $about: String
    $industry: String
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
      image
    }
  }
`;

const styles = ({ layout, palette, spacing }) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontSize: "40px",
    textAlign: "Left",
    color: "rgba(0, 0, 0, 0.87)"
  },
  inputField: {
    width: "100%",
    marginBottom: 30
  },
  label: {
    marginLeft: 10,
    marginBotom: 10
  },
  form: {
    width: "100%",
    maxWidth: 500,
    padding: "30px 0 0 0"
  },
  fieldset: {
    border: 0,
    padding: 0,
    margin: 0
  },
  formControl: {
    width: "100%"
  },
  tagsContainer: {
    display: "flex"
  },
  tagButton: {
    marginLeft: 10,
    background: "#e3e3e3"
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end"
  },

  bigAvatar: {
    marginRight: 10,
    width: 100,
    height: 100
  },
  rightIcon: {
    marginLeft: spacing.unit
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    padding: "0 0 35px 0"
  }
});

class UpdateUser extends Component {
  state = { ...this.props.data.me }

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateUser = async (e, id, updateUserMutation) => {
    e.preventDefault();

    await updateUserMutation({
      variables: {
        id,
        ...this.state
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });
    Router.push({
      pathname: "/account/myaccount"
    });
  };

  uploadFile = async (e, userImageUrl) => {
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
      return <div />;
    }

    return (
      <div>
        <Avatar
          alt={user.name}
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
    const { image, id, me: user } = this.state

    const { classes } = this.props;
    return (
      <Mutation mutation={UPDATE_USER_MUTATION} variables={this.state}>
        {(updateUser, { loading, error }) => (
          <Grid container className={classes.container}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="display3" className={classes.title}>
                      Edit your Profile
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>

            <form
              onSubmit={e => this.updateUser(e, id, updateUser)}
              className={classes.form}
            >
              <Error error={error} />
              <fieldset
                disabled={loading}
                aria-busy={loading}
                style={{
                  borderWidth: "0px"
                }}
              >
                <div className={classes.avatarContainer}>
                  {user.image == null || user.image == "" ? (
                    <Avatar className={classes.bigAvatar}>
                      {user.name[0]}
                    </Avatar>
                  ) : (
                    <Avatar
                      alt={user.name}
                      src={user.image}
                      className={classes.bigAvatar}
                    />
                  )}
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
                      Change Avatar{" "}
                      <CloudUploadIcon className={classes.rightIcon} />
                    </Button>
                  </label>
                  {this.uploadMessage(image)}
                </div>

                <label htmlFor="name">
                  <TextField
                    label="name"
                    type="text"
                    name="name"
                    variant="filled"
                    defaultValue={user.name}
                    onChange={this.handleChange}
                    className={classes.inputField}
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
                    className={classes.inputField}
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
                    className={classes.inputField}
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
                    className={classes.inputField}
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
                    className={classes.inputField}
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
                    className={classes.inputField}
                  />
                </label>

                <div className={classes.buttonContainer}>
                  <Button variant="contained" type="submit">
                    Sav{loading ? "ing" : "e"} Changes
                  </Button>
                </div>
              </fieldset>
            </form>
          </Grid>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(UpdateUser);
export { UPDATE_USER_MUTATION };
