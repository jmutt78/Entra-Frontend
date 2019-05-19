import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CreateTag from "./CreateTag";
import Tags from "./Tags";

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
        <div>
          <h1>Ask a question</h1>
          <Tags />
        </div>
        <div>
          <Button variant="link" onClick={this.openCreateTagModal}>
            ADD NEW TAG
          </Button>
        </div>
        <CreateTag
          open={this.state.showCreateTagModal}
          onClose={this.closeCreateTagModal}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(CreateQuestion);
