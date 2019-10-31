import React from 'react';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Error from './../ErrorMessage.js';
import tagsListQuery from './tagsListQuery';
import Tags from './Tags';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      <Query query={tagsListQuery} variables={{}}>
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          return (
            <Grid container className={classes.container}>
              <div className={classes.formContainer}>
                <Tags user={this.props.user} tag={data.tags} />
              </div>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(Seasoned);
