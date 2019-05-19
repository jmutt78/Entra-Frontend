import React from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import CreateTag from "./CreateTag";
import { TAGS_QUERY } from "./Tags";

const styles = theme => ({
  grid: {
    margin: theme.spacing.unit
  },
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
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
    }
  }
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

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
    console.log(this.state);
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
                tags: tags.map(tag => ({ name: tag }))
              }}
            >
              {(createQuestion, { error, loading }) => {
                return (
                  <div container className={classes.root} spacing={16}>
                    <div>
                      <h1>Ask a question</h1>
                    </div>
                    <div>
                      <label htmlFor="title">
                        <TextField
                          label="Title"
                          type="text"
                          name="title"
                          variant="filled"
                          value={title}
                          onChange={this.handleTitleChange}
                          className={classes.textField}
                        />
                      </label>
                      <label htmlFor="description">
                        <TextField
                          label="Description"
                          type="text"
                          name="description"
                          variant="filled"
                          value={description}
                          onChange={this.handleDescriptionChange}
                          className={classes.textField}
                        />
                      </label>
                      <Select
                        multiple
                        value={tags}
                        onChange={this.handleTagsChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {data.tags.map(tag => (
                          <MenuItem key={tag.name} value={tag.name}>
                            <Checkbox
                              checked={this.state.tags.indexOf(tag.name) > -1}
                            />
                            <ListItemText primary={tag.name} />
                          </MenuItem>
                        ))}
                      </Select>
                      <Button variant="link" onClick={this.openCreateTagModal}>
                        ADD NEW TAG
                      </Button>
                    </div>
                    <CreateTag
                      open={showCreateTagModal}
                      onClose={this.closeCreateTagModal}
                    />
                    <Button variant="link" onClick={() => createQuestion()}>
                      Create Question
                    </Button>
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

export default withStyles(styles)(CreateQuestion);
