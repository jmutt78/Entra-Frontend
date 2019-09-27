import React from 'react';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Mutation, Query } from 'react-apollo';
import Error from './../ErrorMessage.js';

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
import Seasoned from './Seasoned';

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 5px'
  },
  title: {
    fontSize: '40px',
    textAlign: 'Left',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: '3rem'
  },

  formContainer: {
    width: '100%',
    maxWidth: 1000,
    display: 'flex',
    justifyContent: 'center'
  }
});

class Onboarding extends React.Component {
  state = {
    firstSignin: true,
    newEntra: false,
    seasonedEntra: false
  };

  handleNewClick = () => {
    this.setState({
      firstSignin: false,
      newEntra: true
    });
  };

  handleSeasonedClick = () => {
    this.setState({ firstSignin: false, seasonedEntra: true, newEntra: false });
  };

  handleRestartClick = () => {
    this.setState({ firstSignin: true, newEntra: false, seasonedEntra: false });
  };

  render() {
    const { classes } = this.props;
    const seasoned = this.state.seasonedEntra;
    const newEntra = this.state.newEntra;
    const firstSignin = this.state.firstSignin;

    return (
      <Grid container className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" className={classes.title}>
                  Welcome To Entra
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <div>Hold for Video</div>
        <div className={classes.formContainer}>
          {firstSignin && (
            <Button onClick={this.handleNewClick}>New Entrepreneur?</Button>
          )}
          {firstSignin && (
            <Button onClick={this.handleSeasonedClick}>
              Seasoned Entrepreneur/Advisor
            </Button>
          )}

          {seasoned && <Seasoned />}
          {newEntra && (
            <div className={classes.formContainer}>
              <Link href="/qa">
                <Button>Ask a Question?</Button>
              </Link>
              <Button onClick={this.handleSeasonedClick}>View Questions</Button>
            </div>
          )}
        </div>

        <div>
          {!firstSignin && (
            <Button onClick={this.handleRestartClick}>Start Over</Button>
          )}
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(Onboarding);
