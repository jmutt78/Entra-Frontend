import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Linkedin from './Linkedin';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%',

    background: '#2e6da4',
    margin: '10px 0',
    cursor: 'pointer'
  }
});

class LinkedinLoginButton extends React.Component {
  onSuccess = response => {
    console.log(response, 'onSuccess');
  };
  onFailure = e => {};
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Linkedin
          clientId={process.env.LINKEDIN_CLIENT_ID}
          redirectUri={process.env.LINKEDIN_REDIRECT_URI}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          redirectPath="/linkedin"
        />
      </div>
    );
  }
}

export default withStyles(styles)(LinkedinLoginButton);
