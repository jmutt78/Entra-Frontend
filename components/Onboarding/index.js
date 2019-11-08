import React from 'react';
import { Query } from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Error from './../ErrorMessage.js';
import PageHeader from '../PageHeader';
import TagSelect from './TagSelect';
import { CURRENT_USER_QUERY } from '../auth/User';

const useStyles = makeStyles(({ layout, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 5px'
  }
}));

export default () => {
  const { container } = useStyles();
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;

        return (
          <Grid container className={container}>
            <PageHeader title={'Welcome To Entra!'} />
            <TagSelect user={data.me} />
          </Grid>
        );
      }}
    </Query>
  );
};
