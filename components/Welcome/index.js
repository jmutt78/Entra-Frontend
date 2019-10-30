import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import { Mixpanel } from '../../utils/Mixpanel';

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

class Welcome extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            Welcome To Entra!
          </Typography>
          <div>Hold for video</div>
        </Grid>
        <Link href="/tag-select">
          <Button variant="contained" type="button">
            NEXT
          </Button>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(Welcome);
