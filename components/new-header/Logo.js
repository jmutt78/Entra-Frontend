import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

import useWindowSize from './useWindowSize';

const useStyles = makeStyles({
  logo: {
    maxHeight: 45,
    cursor: 'pointer'
  }
});

export default () => {
  const classes = useStyles();
  const [width] = useWindowSize();

  return (
    <Link href="/all">
      {width > 1100 ? (
        <img
          src="/static/logo-full.png"
          className={classes.logo}
          alt="entra logo"
        />
      ) : (
        <img
          src="/static/logo-small.png"
          className={classes.logo}
          alt="entra logo"
        />
      )}
    </Link>
  );
};
