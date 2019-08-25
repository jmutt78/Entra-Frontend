import React from "react";
import Router from "next/router";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import Error from "./../ErrorMessage.js";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Fab from "@material-ui/core/Fab";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import CreateTag from "./CreateTag";
import { TAGS_QUERY } from "./Tags";
import questionListQuery from "../question-list/questionListQuery";

const styles = ({ layout, palette }) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: '0 5px',
  },
  table: {},
  title: {
    fontSize: "40px",
    textAlign: "Left",
    color: "rgba(0, 0, 0, 0.87)"
    lineHeight: '3rem',
  },
  inputField: {
    width: "100%",
    marginBottom: 30
  },
  label: {
    marginLeft: 10,
    marginBotom: 10
  },
  formContainer: {
    width: "100%",
    maxWidth: 1000,
    display: "flex",
    justifyContent: "center"
  },
  form: {
    width: "100%",
    maxWidth: 500,
    padding: "50px 0 0 0"
  },
  fieldset: {
    border: 0,
    padding: 0,
    margin: 0
  },
  formControl: {
    width: "100%"
  },
  tagsContainer: {
    display: "flex"
  },
  tagButton: {
    marginLeft: 10,
    background: "#e3e3e3"
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end"
  }
});

export const CREATE_QUESTION_MUTATION = gql`
  mutation createQuestion(
    $title: String!
    $description: String
    $tags: [TagInput!]!
    $approval: Boolean
  ) {
    createQuestion(
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

class CreateQuestion extends React.Component {
  state = {
    showCreateTagModal: false,
    title: "",
    description: "",
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
              mutation={CREATE_QUESTION_MUTATION}
              variables={{
                title,
                description,
                tags: tags.map(tag => ({ name: tag })),
                approval: false
              }}
              refetchQueries={[
                {
                  query: questionListQuery,
                  variables: { filter: "my" }
                },
                {
                  query: questionListQuery,
                  variables: { filter: "approval" }
                }
              ]}
            >
              {(createQuestion, { error, loading }) => {
                return (
                  <Grid container className={classes.container}>
                    <Error error={error} />
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h6" className={classes.title}>
                              Ask a question
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>

                    <div className={classes.formContainer}>
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
                            description: "",
                            tags: []
                          });
                        }}
                        className={classes.form}
                      >
                        <fieldset
                          disabled={loading}
                          aria-busy={loading}
                          className={classes.fieldset}
                        >
                          <FormControl className={classes.formControl}>
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

                          <div className={classes.tagsContainer}>
                            <FormControl className={classes.formControl}>
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
                                className={classes.inputField}
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

                            <div>
                              <Fab
                                color="primary"
                                aria-label="add"
                                onClick={this.openCreateTagModal}
                                className={classes.tagButton}
                              >
                                <AddIcon />
                              </Fab>
                            </div>
                          </div>

                          <FormControl className={classes.formControl}>
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

                          <CreateTag
                            open={showCreateTagModal}
                            onClose={this.closeCreateTagModal}
                          />

                          <div className={classes.buttonContainer}>
                            <Button variant="contained" type="submit">
                              Post Question
                            </Button>
                          </div>
                        </fieldset>
                      </form>
                    </div>
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
