import React, { Component } from "react";
import Router from "next/router";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import Error from "./../ErrorMessage.js";
import AddTagModel from "./AddTagModel";
import QuestionTagSelect from "./QuestionTagSelect";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

const UPDATE_QUESTION_MUTATION = gql`
  mutation UPDATE_QUESTION_MUTATION(
    $id: ID!
    $title: String!
    $description: String!
    $tags: [TagInput!]!
  ) {
    updateQuestion(
        id: $id
        title: $title
        description: $description
        tags: $tags
    ) {
        id
        title
        description
        tags {
            name
        }
    }
  }
`;

const CREATE_QUESTION_MUTATION = gql`
  mutation CREATE_QUESTION_MUTATION(
    $title: String!
    $description: String!
    $tags: [TagInput!]!
  ) {
    createQuestion(
        title: $title
        description: $description
        tags: $tags
    ) {
        title
        description
        tags {
            name
        }
    }
  }
`;

const styles = theme => ({
    container: {
        display: "flex",

        width: 80
    },
    textField: {
        marginLeft: 15,
        marginRight: 15,
        width: 700,
        marginBottom: 30
    },
    smallField: {
        marginLeft: 15,
        marginRight: 15,
        width: 330,
        marginBottom: 30
    },

    bigAvatar: {
        margin: 10,
        width: 100,
        height: 100
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    },
    text: {
        margin: 10
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        maxWidth: 200,
        alignSelf: 'flex-end'
    },
    tagPaper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

class DisplayEditQuestion extends Component {
    state = {
        id: this.props.question.id,
        title: this.props.question.title,
        description: this.props.question.description,
        tags: (this.props.question.tags || []).map(tag => ({
            value: tag['name'],
            label: tag['name']
        })),
    };
    selectedTags = [];

    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        this.setState({ [name]: val });
    };

    onQuestionSubmit = async (e, id, mutationFunction) => {
        e.preventDefault();
        console.log("Updating Question!!");

        let state = { ...this.state };
        state.tags = this.selectedTags.map(tag => ({
            name: tag['value']
        }));

        console.log(state);

        const res = await mutationFunction({
            variables: {
                id,
                ...state
            }
        });

        Router.push("/question/myquestion");
    };

    onTagDelete = data => () => {
        this.setState({ tags: this.state.tags.filter(tag => tag.id != data.id) });
    }

    onUpdateTags = (tags) => {
        this.selectedTags = tags;
    }

    render() {
        const { classes } = this.props;
        const { id, title, description, tags } = this.state;
        const createMode = id === undefined;

        let mutation = createMode ? CREATE_QUESTION_MUTATION : UPDATE_QUESTION_MUTATION;

        return (
            <Mutation mutation={mutation}>
                {
                    (mutationFunction, { loading, error }) => (
                        <Grid container className={classes.root} spacing={16}>
                            <Grid item xs={3} />
                            <Grid item xs={5}>
                                <form onSubmit={e => this.onQuestionSubmit(e, id, mutationFunction)}>
                                    <Error error={error} />

                                    <fieldset
                                        disabled={loading}
                                        aria-busy={loading}
                                        style={{
                                            borderWidth: "0px"
                                        }}
                                    >
                                        <Typography variant="h4" className={classes.text}>
                                            Add Question
                                        </Typography>

                                        <label htmlFor="title">
                                            <TextField
                                                label="title"
                                                type="text"
                                                name="title"
                                                variant="filled"
                                                defaultValue={title}
                                                onChange={this.handleChange}
                                                className={classes.smallField}
                                            />
                                        </label>
                                        <label htmlFor="description">
                                            <TextField
                                                label="description"
                                                type="text"
                                                name="description"
                                                rowsMax="4"
                                                rows="6"
                                                multiline
                                                variant="filled"
                                                defaultValue={description}
                                                onChange={this.handleChange}
                                                className={classes.textField}
                                            />
                                        </label>

                                        <div>
                                            <AddTagModel />
                                            <QuestionTagSelect
                                                tags={tags}
                                                updateTags={this.onUpdateTags}
                                            />
                                        </div>

                                        <div>
                                            <Button variant="contained" type="submit">
                                                Sav{loading ? "ing" : "e"} Changes
                                          </Button>
                                        </div>
                                    </fieldset>
                                </form>
                                <Grid xs={2} />
                            </Grid>
                        </Grid>
                    )
                }
            </Mutation>
        );
    }
}

DisplayEditQuestion.propTypes = {
};

export default withStyles(styles)(DisplayEditQuestion);