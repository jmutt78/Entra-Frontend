import React from 'react';
import { Query } from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Error from './../ErrorMessage.js';
import Tags from './Tags';
import tagsListQuery from './tagsListQuery';

const useStyles = makeStyles(({ layout, palette }) => ({
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
}));

export default ({ user }) => {
  const { container, formContainer } = useStyles();
  return (
    <Query query={tagsListQuery} variables={{}}>
      {({ data, loading, error }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        return (
          <Grid container className={container}>
            <div className={formContainer}>
              <Tags user={user} _tags={data.tags} />
            </div>
          </Grid>
        );
      }}
    </Query>
  );
};
