import React from 'react';
import { Query } from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Error from './../ErrorMessage.js';
import Tags from './Tags';
import tagsListQuery from './tagsListQuery';

const useStyles = makeStyles(({ layout, palette }) => ({
  formContainer: {}
}));

export default ({ user }) => {
  const { formContainer } = useStyles();
  return (
    <Query query={tagsListQuery} variables={{}}>
      {({ data, loading, error }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        return (
          <div className={formContainer}>
            <Tags user={user} _tags={data.tags} />
          </div>
        );
      }}
    </Query>
  );
};
