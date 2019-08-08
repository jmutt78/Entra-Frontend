import React from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";

import Link from "next/link";

import questionQuery from "../question-display/questionQuery.js";
import { CURRENT_USER_QUERY } from "../auth/User";

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
  },
  button: {
    backgroundColor: "#E27D60",
    marginLeft: theme.spacing.unit * 2
  }
});

export const CREATE_ANSWER = gql`
  mutation creatAnswer($questionId: ID!, $body: String!) {
    createAnswer(questionId: $questionId, body: $body) {
      id
      body
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

  submitForm = async (e, createQuestion) => {
    e.preventDefault();
    const res = await createQuestion({
      variables: {
        questionId: this.props.question.id,
        ...this.state
      }
    });

    this.setState({
      body: ""
    });
  };

  handleQuestion(id, myAnswers, body, classes, loading, createQuestion) {
    const arr = [];
    for (var i = 0; i < myAnswers.length; i++) {
      const answers = [myAnswers[i].answeredTo[0]];
      arr.push(answers);
    }
    const num = arr.some(element => element[0].id === id);

    if (num === true) {
      return <div />;
    } else {
      return (
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs />
          <Grid item xs={7} className={classes.grid}>
            <Divider variant="middle" />
            <form
              method="post"
              onSubmit={e => this.submitForm(e, createQuestion)}
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
    }
  }

  render() {
    const { classes } = this.props;
    const { body } = this.state;

    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          const user = data.me;
          if (!user) {
            return <div />;
          }
          const myAnswers = user.myAnswers;
          const id = this.props.question.id;
          return (
            <Mutation
              mutation={CREATE_ANSWER}
              variables={this.state}
              refetchQueries={[
                {
                  query: questionQuery,
                  variables: { id: this.props.question.id }
                },
                { query: CURRENT_USER_QUERY }
              ]}
            >
              {(createQuestion, { error, loading }) => {
                return (
                  <div>
                    {this.handleQuestion(
                      id,
                      myAnswers,
                      body,
                      classes,
                      loading,
                      createQuestion
                    )}
                  </div>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(CreateAnswer);
