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
import FilledInput from "@material-ui/core/FilledInput";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

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
    tags: this.props.question.tags.map(tag => tag.name)
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

        ...this.state,
        tags: this.state.tags.map(tag => ({
          name: tag
        }))
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
              refetchQueries={[
                {
                  query: questionListQuery,
                  variables: { filter: "my" }
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
                              <FormControl
                                variant="filed"
                                className={classes.inputField}
                              >
                                <InputLabel
                                  htmlFor="tags"
                                  className={classes.label}
                                >
                                  Tag(s)
                                </InputLabel>
                                <Select
                                  multiple
                                  value={tags}
                                  name="tags"
                                  onChange={this.handleTagsChange}
                                  input={
                                    <FilledInput
                                      name="tab"
                                      id="filled-age-native-simple"
                                    />
                                  }
                                  renderValue={selected => selected.join(", ")}
                                >
                                  {data.tags.map(tag => (
                                    <MenuItem key={tag.name} value={tag.name}>
                                      <Checkbox
                                        checked={
                                          this.state.tags.indexOf(tag.name) > -1
                                        }
                                      />
                                      <ListItemText primary={tag.name} />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <Button
                                variant="text"
                                onClick={this.openCreateTagModal}
                                className={classes.addNewTag}
                              >
                                ADD NEW TAG
                              </Button>

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
                      <div style={{ color: "red" }}>
                        {error && error.message.replace("GraphQL error: ", "")}
                      </div>
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
