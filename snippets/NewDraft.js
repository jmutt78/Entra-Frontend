import React from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import { Editor, EditorState, RichUtils } from "draft-js";

import { CURRENT_USER_QUERY } from "../auth/User";

const styles = theme => ({
  grid: {
    margin: theme.spacing(1)
  },
  container: {
    display: "flex"
  },
  flex1: {
    flex: 1
  },
  root: {
    margin: theme.spacing(1),
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

const CREATE_QUESTION_MUTATION = gql`
  mutation createQuestion(
    $title: String!
    $description: String
    $tags: [TagInput!]!
  ) {
    createQuestion(title: $title, description: $description, tags: $tags) {
      id
      title
      tags {
        id
        name
      }
      id
    }
  }
`;

class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }

  state = {
    title: "",
    description: ""
  };

  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };
  handleDescriptionChange = e => {
    this.setState({
      description: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { title, description } = this.state;
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ loading, data }) => {
          if (loading) {
            return null;
          }
          const user = data.me;
          return (
            <Mutation
              mutation={CREATE_QUESTION_MUTATION}
              variables={{
                title,
                description
              }}
            >
              {(createQuestion, { error, loading }) => {
                return (
                  <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={2} />
                    <Grid item xs={6}>
                      <form
                        method="post"
                        onSubmit={async e => {
                          e.preventDefault();
                          const res = await createQuestion();

                          Router.push({
                            pathname: "/question",
                            query: { id: res.data.createQuestion.id }
                          });

                          this.setState({
                            title: "",
                            description: ""
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
                              <h1>Create a Post</h1>
                            </div>
                            <div>
                              <Editor
                                editorState={this.state.editorState}
                                handleKeyCommand={this.handleKeyCommand}
                                onChange={this.onChange}
                              />

                              <FormControl>
                                <label htmlFor="title">
                                  <TextField
                                    label="Title"
                                    type="text"
                                    name="title"
                                    variant="filled"
                                    value={title}
                                    onChange={this.handleTitleChange}
                                    className={classes.inputField}
                                  />
                                </label>
                              </FormControl>

                              <FormControl>
                                <label htmlFor="body">
                                  <TextField
                                    label="Tell a Story..."
                                    type="text"
                                    name="description"
                                    variant="filled"
                                    multiline
                                    rows={40}
                                    value={description}
                                    onChange={this.handleDescriptionChange}
                                    className={classes.inputField}
                                  />
                                </label>
                              </FormControl>
                            </div>

                            <div className={classes.container}>
                              <div className={classes.flex1}>
                                <Button variant="contained" type="submit">
                                  Post
                                </Button>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </form>
                    </Grid>
                  </Grid>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(CreateQuestion);
