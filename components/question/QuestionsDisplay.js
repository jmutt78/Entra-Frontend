import React, { Component } from "react";
import Router from "next/router";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withStyles } from "@material-ui/core/styles";
import Error from "./../ErrorMessage.js";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const DELETE_QUESTION_MUTATION = gql`
  mutation DELETE_QUESTION_MUTATION(
    $id: ID!
  ) {
    deleteQuestion(
        id: $id
    ) {
        id
    }
  }
`;

const styles = theme => ({
    root: {
        margin: 'auto 40px',
        display: 'flex',
        flexDirection: 'column'
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        maxWidth: 200,
        alignSelf: 'flex-end'
    },
    iconHover: {
        margin: theme.spacing.unit,
        cursor: 'pointer',
        '&:hover': {
            color: blue[800],
        }
    }
});

class QuestionsDisplay extends Component {
    state = {
        questions: this.props.questions
    };

    onAddQuestion() {
        Router.push("/question/editquestion");
    }

    onEditQuestion(question) {
        Router.push({
            pathname: "/question/editquestion",
            query: { id: question.id }
        });
    }

    onDeleteQuestion = async (id, deleteQuestion) => {
        const res = await deleteQuestion({
            variables: {
                id
            }
        });

        this.setState({ questions: this.state.questions.filter(question => question.id != res.data.deleteQuestion.id) });
    }

    render() {
        const { classes } = this.props;
        const { questions } = this.state;

        return (
            <Mutation mutation={DELETE_QUESTION_MUTATION}>
                {
                    (deleteQuestion, { loading, error }) => {
                        if (loading) return <p>Loading...</p>;

                        return (
                            <>
                                <Error error={error} />

                                <div className={classes.root}>
                                    <Paper className={classes.paper}>
                                        <Table className={classes.table}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell >Title</TableCell>
                                                    <TableCell >Description</TableCell>
                                                    <TableCell >Tags</TableCell>
                                                    <TableCell >Answers</TableCell>
                                                    <TableCell align="right">Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {questions.map(question => (
                                                    <TableRow key={question.id}>
                                                        <TableCell >{question.title}</TableCell>
                                                        <TableCell >{question.description}</TableCell>
                                                        <TableCell >
                                                            {question.tags.map(tag => <div key={tag.id}>{tag.name}</div>)}
                                                        </TableCell>
                                                        <TableCell >{question.answers}</TableCell>
                                                        <TableCell align="right">
                                                            <EditIcon className={classes.iconHover} onClick={() => this.onEditQuestion(question)} />
                                                            <DeleteIcon className={classes.iconHover} onClick={() => this.onDeleteQuestion(question.id, deleteQuestion)} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Paper>

                                    <Button variant="contained" color="primary" className={classes.button} onClick={this.onAddQuestion}>
                                        Add Question
                                    </Button>
                                </div>
                            </>
                        );
                    }
                }
            </Mutation>
        );
    }
}

QuestionsDisplay.propTypes = {
};

export default withStyles(styles)(QuestionsDisplay);