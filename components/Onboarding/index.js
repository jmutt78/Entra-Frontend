import React from 'react';
import { Query } from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Error from './../ErrorMessage.js';
import TagSelect from './TagSelect';
import { CURRENT_USER_QUERY } from '../auth/User';

const useStyles = makeStyles(({ layout, palette }) => ({
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
}));

export default () => {
  const { container, title } = useStyles();
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        return (
          <Grid container className={container}>
            <Typography variant="h6" className={title}>
              Welcome To Entra!
            </Typography>
            <TagSelect user={data.me} />
          </Grid>
        );
      }}
    </Query>
  );
};
