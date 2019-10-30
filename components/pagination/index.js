import React from 'react';
import { Query } from 'react-apollo';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import PaginationActions from './PaginationActions';
import { perPage } from '../../config.js';
import Error from '../ErrorMessage';
import CircularProgress from '@material-ui/core/CircularProgress';

import './index.css';

const styles = ({ palette }) => ({
  text: {
    fontSize: 16,
    color: '#2d3436',
    textDecoration: 'none',
    fontWeight: 500
  },
  subContainer: {
    display: 'flex',
    alignItems: 'center'
  }
});

function Pagination({ variables, page, classes, query, connectionKey }) {
  return (
    <Query query={query} variables={variables}>
      {({ data, loading, error }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        const count = data[connectionKey].aggregate.count;
        const pages = Math.ceil(count / perPage);
        return (
          <div
            className="paginationContainer"
            style={pages <= 1 ? { display: 'none' } : {}}
          >
            <Typography className={classes.subContainer}>
              <span
                className={classes.text}
              >{`Showing page ${page} of ${pages}`}</span>
            </Typography>
            <PaginationActions page={page} pages={pages} />
          </div>
        );
      }}
    </Query>
  );
}

export default withStyles(styles)(Pagination);
