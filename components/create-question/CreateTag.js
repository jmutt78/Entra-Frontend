import React from "react";
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

const DialogTitle = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 4
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
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
    padding: `0 ${theme.spacing.unit * 4}px`
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 4
  }
}))(MuiDialogActions);

const styles = {
  textField: {
    width: 400
  }
};

class CreateTag extends React.Component {
  render() {
    const { open, onClose, classes } = this.props;
    return (
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          Add Tag
        </DialogTitle>
        <DialogContent>
          <label htmlFor="location">
            <TextField
              label="Tag name"
              type="text"
              name="tagName"
              variant="filled"
              value=""
              onChange={this.handleChange}
              className={classes.textField}
            />
          </label>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(CreateTag);
