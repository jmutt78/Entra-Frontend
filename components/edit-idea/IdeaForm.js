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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
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
    marginLeft: 20
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
  }
});

export const UPDATE_IDEA_MUTATION = gql`
  mutation UPDATE_IDEA_MUTATION(
    $id: ID!
    $idea: String!
    $problem: String
    $solution: String
    $customer: String
    $value: String
  ) {
    updateBusinessIdea(
      id: $id
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

class IdeaForm extends React.Component {
  state = {
    idea: this.props.businessIdea.idea,
    problem: this.props.businessIdea.problem,
    solution: this.props.businessIdea.solution,
    customer: this.props.businessIdea.solution,
    value: this.props.businessIdea.value,
    position: 0
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

  handleChange = (e, position) => {
    this.setState({
      position: position
    });
  };

  handleNext = (e, position) => {
    this.setState({
      position: this.state.position + 1
    });
  };

  handleBack = (e, position) => {
    this.setState({
      position: this.state.position - 1
    });
  };

  updateForm = async (e, updateBusinessIdea) => {
    e.preventDefault();
    console.log(this.props.businessIdea.id);
    const res = await updateBusinessIdea({
      variables: {
        id: this.props.businessIdea.id,
        ...this.state
      }
    });

    console.log('Updated!!');
    Router.push({
      pathname: '/idea/idea',
      query: { id: this.props.businessIdea.id }
    });
  };

  render() {
    const { classes } = this.props;
    const { idea, problem, solution, customer, value, position } = this.state;

    return (
      <Mutation
        mutation={UPDATE_IDEA_MUTATION}
        variables={{
          idea,
          problem,
          solution,
          customer,
          value
        }}
      >
        {(updateBusinessIdea, { error, loading }) => {
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
              <AppBar position="static" color="default">
                <Tabs
                  value={position}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Idea" />
                  <Tab label="Problem" />
                  <Tab label="Solution" />
                  <Tab label="Customer" />
                  <Tab label="Value" />
                </Tabs>
              </AppBar>
              <div className={classes.formContainer}>
                <form
                  method="post"
                  onSubmit={e => this.updateForm(e, updateBusinessIdea)}
                  className={classes.form}
                >
                  <fieldset
                    disabled={loading}
                    aria-busy={loading}
                    className={classes.fieldset}
                  >
                    {position === 0 && (
                      <FormControl className={classes.formControl}>
                        <label htmlFor="idea">
                          <TextField
                            required
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
                    )}
                    {position === 1 && (
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
                    )}
                    {position === 2 && (
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
                    )}
                    {position === 3 && (
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
                    )}
                    {position === 4 && (
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
                    )}
                    {position !== 0 ? (
                      <Button
                        variant="contained"
                        type="button"
                        onClick={this.handleBack}
                      >
                        Back
                      </Button>
                    ) : (
                      <div />
                    )}

                    {position === 4 && (
                      <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        className={classes.tagButton}
                      >
                        Save Idea
                      </Button>
                    )}

                    {position !== 4 ? (
                      <Button
                        type="button"
                        variant="contained"
                        onClick={this.handleNext}
                        className={position !== 0 ? classes.tagButton : null}
                      >
                        Next
                      </Button>
                    ) : (
                      <div />
                    )}
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

export default withStyles(styles)(IdeaForm);
