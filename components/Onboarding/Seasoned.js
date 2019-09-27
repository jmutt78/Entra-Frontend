import React from 'react';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import Error from './../ErrorMessage.js';
import Link from 'next/link';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import { Mixpanel } from '../../utils/Mixpanel';
import Tags from './Tags';

import questionListQuery from '../question-list/questionListQuery';

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 5px'
  },

  formContainer: {
    width: '100%',
    maxWidth: 1000,
    display: 'flex',
    justifyContent: 'center'
  }
});

class Seasoned extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.container}>
        <div className={classes.formContainer}>
          <Tags />
          <h2>Or</h2>
          <Link href="/qa">
            <Button>Ask a Question?</Button>
          </Link>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(Seasoned);
