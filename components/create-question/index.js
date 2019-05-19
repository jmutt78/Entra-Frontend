import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CreateTag from "./CreateTag";

const styles = theme => ({
  grid: {
    margin: theme.spacing.unit
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  }
});

class CreateQuestion extends React.Component {
  state = {
    showCreateTagModal: false
  };
  openCreateTagModal = () => {
    this.setState({ showCreateTagModal: true });
  };
  closeCreateTagModal = () => {
    this.setState({ showCreateTagModal: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <h1>Ask a question</h1>
        <button onClick={this.openCreateTagModal}>ADD NEW TAG</button>
        <CreateTag
          open={this.state.showCreateTagModal}
          onClose={this.closeCreateTagModal}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(CreateQuestion);
