import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Error from "./../ErrorMessage.js";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
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

const UPDATE_ANSWER_MUTATION = gql`
  mutation updateAnswer($id: ID!, $body: String!, $approval: Boolean) {
    updateAnswer(id: $id, body: $body, approval: $approval) {
      id
      body
      answeredTo {
        id
      }
      answeredBy {
        id
      }
    }
  }
`;

class AnswerForm extends Component {
  state = {
    body: this.props.answer.body
  };

  handleDescriptionChange = e => {
    this.setState({
      body: e.target.value
    });
  };

  updateForm = async (e, updateAnswer) => {
    e.preventDefault();
    const res = await updateAnswer({
      variables: {
        id: this.props.answer.id,
        approval: null,
        ...this.state
      }
    });

    console.log("Updated!!");
    Router.push({
      pathname: "/question",
      query: { id: this.props.answer.answeredTo[0].id }
    });
  };

  render() {
    const { classes } = this.props;
    const { body } = this.state;
    return (
      <Mutation mutation={UPDATE_ANSWER_MUTATION} variables={this.state}>
        {(updateAnswer, { error, loading }) => {
          return (
            <Grid container className={classes.root} spacing={3}>
              <Grid item xs />
              <Grid item xs={7} className={classes.grid}>
                <Divider variant="middle" />
                <form
                  method="post"
                  onSubmit={e => this.updateForm(e, updateAnswer)}
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
                        <h1>Edit Answer?</h1>
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
                <div style={{ color: "red" }}>
                  {error && error.message.replace("GraphQL error: ", "")}
                </div>
              </Grid>
              <Grid item xs />
            </Grid>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(AnswerForm);
export { UPDATE_ANSWER_MUTATION };
