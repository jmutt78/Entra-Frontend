import React, { useState } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  logo: {
    maxHeight: 45,
    cursor: 'pointer',
    '@media (max-width: 780px)': {
      maxHeight: 35,
      marginTop: -150
    }
  }
});

export default () => {
  const classes = useStyles();
  return (
    <Link href="/all">
      <img src="/static/logo.png" className={classes.logo} alt="entra logo" />
    </Link>
  );
};
