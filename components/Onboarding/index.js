import React from 'react';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Error from './../ErrorMessage.js';
import { CURRENT_USER_QUERY } from '../auth/User';
import { Mixpanel } from '../../utils/Mixpanel';
import TagSelect from './TagSelect';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const user = data.me;
          return (
            <Grid container className={classes.container}>
              <Typography variant="h6" className={classes.title}>
                Welcome To Entra!
              </Typography>

              <div>Hold for Video see how it works</div>
              <TagSelect user={user} />
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(Onboarding);
