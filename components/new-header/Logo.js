import React, { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

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
