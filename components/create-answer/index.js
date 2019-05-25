import React from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import FilledInput from "@material-ui/core/FilledInput";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  grid: {
    margin: theme.spacing.unit
  },
  container: {
    display: "flex"
  },
  flex1: {
    flex: 0.93
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  },
  inputField: {
    width: 900,
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

export const CREATE_ANSWER = gql`
  mutation creatAnswer($questionId: ID!, $body: String!) {
    createAnswer(questionId: $questionId, body: $body) {
      id
    }
  }
`;

class CreateAnswer extends React.Component {
  state = {
    body: ""
  };

  handleDescriptionChange = e => {
    this.setState({
      body: e.target.value
    });
  };
  render() {
    const { classes } = this.props;
    const { body } = this.state;
    console.log(this.props.id);
    return (
      <Mutation
        mutation={CREATE_ANSWER}
        variables={{
          questionId: this.props.id,
          body
        }}
      >
        {(createQuestion, { error, loading }) => {
          return (
            <Grid container className={classes.root} spacing={3}>
              <Grid item xs />
              <Grid item xs={7} className={classes.grid}>
                <Divider variant="middle" />
                <form
                  method="post"
                  onSubmit={async e => {
                    e.preventDefault();
                    await createQuestion();

                    this.setState({
                      body: ""
                    });
                  }}
                >
                  <fieldset
                    disabled={loading}
                    aria-busy={loading}
                    style={{
                      borderWidth: "0px"
                    }}
                  >
                    <div>
                      <div>
                        <h1>Have an Answer?</h1>
                      </div>
                      <div>
                        <FormControl>
                          <label htmlFor="body">
                            <TextField
                              label="Answer"
                              type="text"
                              name="body"
                              variant="filled"
                              multiline
                              rows={4}
                              value={body}
                              onChange={this.handleDescriptionChange}
                              className={classes.inputField}
                            />
                          </label>
                        </FormControl>
                      </div>

                      <div className={classes.flex1} />

                      <Button variant="contained" type="submit">
                        Post Answer
                      </Button>
                    </div>
                  </fieldset>
                </form>
              </Grid>
              <Grid item xs />
            </Grid>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(CreateAnswer);
