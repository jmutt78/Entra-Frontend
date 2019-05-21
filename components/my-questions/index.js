import React from "react";
import { Query } from "react-apollo";

const styles = theme => ({
  grid: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex"
  },
  flex1: {
    flex: 1
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  },
  inputField: {
    width: 700,
    marginBottom: 30
  },
  addNewTag: {
    marginTop: -15,
    marginBottom: 30
  },
  label: {
    marginLeft: 10,
    marginBotom: 10
  },
  postQuestionButton: {
    alignItems: "flex-end"
  }
});

class MyQuestions extends Component {
  render() {
    const { classes } = this.props;
    const user = this.props.data.me;
    return (
      <div>
        <div>my // QUESTION: </div>
      </div>
    );
  }
}

export default withStyles(styles)(MyQuestions);
