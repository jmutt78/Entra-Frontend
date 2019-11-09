import React from 'react';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './../ErrorMessage.js';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import { Mixpanel } from '../../utils/Mixpanel';

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 5px'
  },
  table: {},
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: '3rem'
  },
  inputField: {
    width: '100%',
    marginBottom: 30
  },
  label: {
    marginLeft: 10,
    marginBotom: 10
  },
  formContainer: {
    width: '100%',
    maxWidth: 1000,
    display: 'flex',
    justifyContent: 'center'
  },
  form: {
    width: '100%',
    maxWidth: 500,
    padding: '50px 0 0 0'
  },
  fieldset: {
    border: 0,
    padding: 0,
    margin: 0
  },
  formControl: {
    width: '100%'
  },
  tagsContainer: {
    display: 'flex'
  },
  tagButton: {
    marginLeft: 10,
    background: '#e3e3e3'
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
  }
});

export const CREATE_IDEA_MUTATION = gql`
  mutation createBusinessIdea(
    $idea: String!
    $problem: String
    $solution: String
    $customer: String
    $value: String
  ) {
    createBusinessIdea(
      idea: $idea
      problem: $problem
      solution: $solution
      customer: $customer
      value: $value
    ) {
      id
      idea
      problem
      solution
      customer
      value
    }
  }
`;

// TODO:
//-Either a dropdown with each textbox or a next and back button to make it less overwelming
//-A description for each textbox
//-Router to the entry when its saved
//

class IdeaCreate extends React.Component {
  state = {
    idea: '',
    problem: '',
    solution: '',
    customer: '',
    value: ''
  };

  handleIdeaChange = e => {
    this.setState({
      idea: e.target.value
    });
  };
  handleProblemChange = e => {
    this.setState({
      problem: e.target.value
    });
  };
  handleSolutionChange = e => {
    this.setState({
      solution: e.target.value
    });
  };
  handleCustomerChange = e => {
    this.setState({
      customer: e.target.value
    });
  };
  handleValueChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { idea, problem, solution, customer, value } = this.state;
    return (
      <Mutation
        mutation={CREATE_IDEA_MUTATION}
        variables={{
          idea,
          problem,
          solution,
          customer,
          value
        }}
      >
        {(createIdea, { error, loading }) => {
          return (
            <Grid container className={classes.container}>
              <Error error={error} />
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6" className={classes.title}>
                        Create a Business Idea
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
                    const res = await createIdea();

                    // Router.push({
                    //   pathname: '/question',
                    //   query: { id: res.data.createQuestion.id }
                    // });

                    this.setState({
                      idea: '',
                      problem: '',
                      solution: '',
                      customer: '',
                      value: ''
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
                      <label htmlFor="idea">
                        <TextField
                          label="Idea"
                          type="text"
                          name="idea"
                          variant="filled"
                          value={idea}
                          onChange={this.handleIdeaChange}
                          className={classes.inputField}
                        />
                      </label>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                      <label htmlFor="problem">
                        <TextField
                          label="Problem"
                          type="text"
                          name="problem"
                          variant="filled"
                          multiline
                          rows={4}
                          value={problem}
                          onChange={this.handleProblemChange}
                          className={classes.inputField}
                        />
                      </label>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                      <label htmlFor="solution">
                        <TextField
                          label="Solution"
                          type="text"
                          name="solution"
                          variant="filled"
                          multiline
                          rows={4}
                          value={solution}
                          onChange={this.handleSolutionChange}
                          className={classes.inputField}
                        />
                      </label>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                      <label htmlFor="customer">
                        <TextField
                          label="Customer"
                          type="text"
                          name="customer"
                          variant="filled"
                          multiline
                          rows={4}
                          value={customer}
                          onChange={this.handleCustomerChange}
                          className={classes.inputField}
                        />
                      </label>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                      <label htmlFor="value">
                        <TextField
                          label="Value"
                          type="text"
                          name="value"
                          variant="filled"
                          multiline
                          rows={4}
                          value={value}
                          onChange={this.handleValueChange}
                          className={classes.inputField}
                        />
                      </label>
                    </FormControl>

                    <div className={classes.buttonContainer}>
                      <Button variant="contained" type="submit">
                        Save Idea
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
  }
}

export default withStyles(styles)(IdeaCreate);
