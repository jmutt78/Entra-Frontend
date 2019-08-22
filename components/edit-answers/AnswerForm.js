import Router from "next/router";

import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Typography from "@material-ui/core/Typography";
import Error from "./../ErrorMessage.js";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = ({ layout, palette }) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    fontSize: "40px",
    textAlign: "Left",
    color: "rgba(0, 0, 0, 0.87)"
  },
  inputField: {
    width: "100%",
    marginBottom: 30
  },
  formContainer: {
    width: "100%",
    maxWidth: 1000,
    display: "flex",
    justifyContent: "center"
  },
  label: {
    marginLeft: 10,
    marginBotom: 10
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
        approval: false,
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
            <Grid container className={classes.container}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" className={classes.title}>
                        Edit Answer
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>

              <div className={classes.formContainer}>
                <form
                  method="post"
                  onSubmit={e => this.updateForm(e, updateAnswer)}
                  className={classes.form}
                >
                  <fieldset
                    disabled={loading}
                    aria-busy={loading}
                    style={{
                      borderWidth: "0px"
                    }}
                  >
                    <label htmlFor="body">
                      <TextField
                        label="Answer"
                        type="text"
                        name="body"
                        variant="filled"
                        multiline
                        rows={8}
                        value={body}
                        onChange={this.handleDescriptionChange}
                        className={classes.inputField}
                      />
                    </label>

                    <div className={classes.buttonContainer}>
                      <Button variant="contained" type="submit">
                        Post Answer
                      </Button>
                    </div>
                  </fieldset>
                </form>
              </div>
              <Error error={error} />
            </Grid>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(AnswerForm);
export { UPDATE_ANSWER_MUTATION };
