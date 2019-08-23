import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { TAGS_QUERY } from "./Tags";

const DialogTitle = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(4)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h4">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: `0 ${theme.spacing(4)}px`
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(4)
  }
}))(MuiDialogActions);

const styles = {
  textField: {
    width: 400
  }
};

export const CREATE_TAG_MUTATION = gql`
  mutation CREATE_TAG_MUTATION($name: String!) {
    createTag(name: $name) {
      id
      name
    }
  }
`;

class CreateTag extends React.Component {
  state = {
    name: ""
  };
  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  render() {
    const { open, onClose, classes } = this.props;
    return (
      <Mutation
        mutation={CREATE_TAG_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: TAGS_QUERY }]}
      >
        {(createTag, { error, loading }) => (
          <Dialog aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
              Add Tag
            </DialogTitle>
            <DialogContent>
              <label htmlFor="location">
                <TextField
                  label="Tag name"
                  type="text"
                  name="name"
                  variant="filled"
                  error={Boolean(error)}
                  value={this.state.name}
                  onChange={this.handleChange}
                  className={classes.textField}
                />
              </label>
              <div style={{ color: "red" }}>
                {error && error.message.replace("GraphQL error: ", "")}
              </div>
            </DialogContent>

            <DialogActions>
              <Button
                variant="contained"
                onClick={async () => {
                  await createTag();
                  this.setState({ name: "" });
                  onClose();
                }}
              >
                Save tag
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(CreateTag);
