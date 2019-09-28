import React from 'react';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = ({ layout, palette, spacing }) => ({
  textTop: {
    color: 'white',
    fontSize: 20
  },
  container: {
    backgroundColor: '#85BDCB',
    boxShadow: 'none',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px'
  },
  signupButton: {
    backgroundColor: palette.primary.dark,
    '&:hover': {
      backgroundColor: palette.primary.main
    },
    marginLeft: 10
  }
});

const PromptBar = ({ classes }) => {
  return (
    <div className="promptBar-wrapper">
      <div className={classes.container} position="static">
        <Typography className={classes.textTop}>
          Do you have an Answer? 👉
        </Typography>

        <Link href="/signup">
          <Button
            variant="contained"
            color="secondary"
            className={classes.signupButton}
          >
            Sign up now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default withStyles(styles)(PromptBar);
