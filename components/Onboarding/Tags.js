import React from 'react';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
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

import { perPage } from '../../config.js';
import tagsListQuery from './tagsListQuery';
import { Mixpanel } from '../../utils/Mixpanel';

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

class Tags extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Query
        query={tagsListQuery}
        variables={{
          skip: 1 * perPage - perPage,
          first: perPage
        }}
      >
        {({ data, loading, error }) => {
          console.log(data);
          const tags = data.tags;
          return (
            <div>
              <Grid container className={classes.container}>
                <h2>Choose a Category</h2>

                <div>
                  {tags && (
                    <div className="tagButtons">
                      {tags.map(({ id, name }) => (
                        <div key={id} style={{ padding: '2px 0' }}>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();

                              Router.push({
                                pathname: '/tags',
                                query: { id: id }
                              });
                            }}
                          >
                            {name}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Grid>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(Tags);
