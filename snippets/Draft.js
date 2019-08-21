import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from "draft-js";
import Error from "./../ErrorMessage.js";
import { withStyles } from "@material-ui/core/styles";
import BlockStyleControls from "../style-control/BlockStyle";
import InlineStyleControls from "../style-control/InlineStyle";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

const CREATE_BLOG_MUTATION = gql`
  mutation createBlog($blocks: [BlocksWhereInput!]!) {
    createBlog(blocks: $blocks) {
      id
      blocks {
        id
        text
        type
        depth
      }
    }
  }
`;

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
    marginTop: 40
  },
  RichEditorRoot: {
    background: "#fff",
    border: "1px solid #dddd",
    fontFamily: "Georgia",
    fontSize: "14px",
    padding: "15px",
    minHeight: "100px"
  }
});

class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      editor: null
    };

    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  componentDidMount() {
    this.setState({ editor: Editor });
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  getContentAsRawJson() {
    const contentState = this.state.editorState.getCurrentContent();
    const raw = convertToRaw(contentState);

    return JSON.stringify(raw, null, 2);
  }

  handleBlog = async createBlog => {
    const json = this.getContentAsRawJson();
    console.log(json);
    const res = await createBlog({
      variables: {
        json
      }
    });

    console.log("saved!!");
  };

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }
  render() {
    const { classes } = this.props;
    const ClientEditor = this.state.editor;
    const { editorState } = this.state;

    return (
      <Mutation mutation={CREATE_BLOG_MUTATION}>
        {(createBlog, { error, loading }) => {
          return (
            <Grid container className={classes.root} spacing={16}>
              <Error error={error} />
              <Grid item xs={2} />
              <Grid item xs={6}>
                <BlockStyleControls
                  editorState={editorState}
                  onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                  editorState={editorState}
                  onToggle={this.toggleInlineStyle}
                />

                <div className={classes.RichEditorRoot}>
                  {this.state.editor ? (
                    <ClientEditor
                      editorState={editorState}
                      handleKeyCommand={this.handleKeyCommand}
                      onChange={this.onChange}
                      onTab={this.onTab}
                      placeholder="Tell a story..."
                      ref="editor"
                      spellCheck={true}
                    />
                  ) : null}
                </div>

                <button onClick={this.handleBlog.bind(this, createBlog)}>
                  Save content
                </button>
              </Grid>
            </Grid>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(MyEditor);
