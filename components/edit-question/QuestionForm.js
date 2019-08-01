import React from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import CreateTag from "../create-question/CreateTag.js";
import questionListQuery from "../question-list/questionListQuery";
import { TAGS_QUERY } from "../create-question/Tags";

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

const UPDATE_QUESTION_MUTATION = gql`
  mutation updateQuestion(
    $id: ID!
    $title: String!
    $description: String
    $tags: [TagInput!]!
    $approval: Boolean
  ) {
    updateQuestion(
      id: $id
      title: $title
      description: $description
      tags: $tags
      approval: $approval
    ) {
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

class QuestionForm extends React.Component {
  state = {
    showCreateTagModal: false,
    title: this.props.question.title,
    description: this.props.question.description,
    tags: []
  };

  openCreateTagModal = () => {
    this.setState({ showCreateTagModal: true });
  };
  closeCreateTagModal = () => {
    this.setState({ showCreateTagModal: false });
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
  handleTagsChange = e => {
    this.setState({
      tags: e.target.value
    });
  };

  updateForm = async (e, updateQuestion) => {
    e.preventDefault();
    const res = await updateQuestion({
      variables: {
        id: this.props.question.id,
        approval: null,

        ...this.state
      }
    });

    console.log("Updated!!");
    Router.push({
      pathname: "/question",
      query: { id: this.props.question.id }
    });
  };

  render() {
    const { classes } = this.props;
    const { title, description, tags, showCreateTagModal } = this.state;
    return (
      <Query query={TAGS_QUERY}>
        {({ loading, data }) => {
          if (loading) {
            return null;
          }
          return (
            <Mutation
              mutation={UPDATE_QUESTION_MUTATION}
              variables={this.state}
              refetchQueries={[
                {
                  query: questionListQuery,
                  variables: { filter: ["my", "all"] }
                }
              ]}
            >
              {(updateQuestion, { error, loading }) => {
                return (
                  <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={2} />
                    <Grid item xs={6}>
                      <form
                        method="post"
                        onSubmit={e => this.updateForm(e, updateQuestion)}
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
                              <h1>Edit your question?</h1>
                            </div>
                            <div>
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
                                <label htmlFor="description">
                                  <TextField
                                    label="Description"
                                    type="text"
                                    name="description"
                                    variant="filled"
                                    multiline
                                    rows={4}
                                    value={description}
                                    onChange={this.handleDescriptionChange}
                                    className={classes.inputField}
                                  />
                                </label>
                              </FormControl>
                            </div>
                            <CreateTag
                              open={showCreateTagModal}
                              onClose={this.closeCreateTagModal}
                            />
                            <div className={classes.container}>
                              <div className={classes.flex1} />
                              <div>
                                <Button variant="contained" type="submit">
                                  Post Question
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

export default withStyles(styles)(QuestionForm);
