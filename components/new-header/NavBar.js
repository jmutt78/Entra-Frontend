import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import './Appbar.css';
import Avatar from '../Avatar';
import Logo from './Logo';
import NavBarFlexContent from './NavBarFlexContent';
import useWindowSize from './useWindowSize';
import { Mixpanel } from '../../utils/Mixpanel';

const styles = ({ layout, palette }) => ({
  root: {
    width: layout.width,
    minHeight: layout.headerHeight,
    backgroundColor: palette.secondary.main,
    boxShadow:
      '0px 2px 4px -4px rgba(0, 0, 0, 0.2), 0px 4px 5px -5px rgba(0, 0, 0, 0.14), 0px 1px 10px -10px rgba(0, 0, 0, 0.12)'
  },
  subContainer: {
    display: 'flex',
    height: '33%',
    alignItems: 'center'
  },
  hidden: {
    visibility: 'hidden'
  },
  button: {
    margin: 12
  },
  signupButton: {
    backgroundColor: '#E27D60',
    margin: 12,
    '&:hover': {
      backgroundColor: palette.accent.main
    }
  },
  loginButton: {
    backgroundColor: palette.accent.grey,
    '&:hover': {
      backgroundColor: palette.accent.main
    }
  },

  navLink: {
    display: 'flex',
    alignItems: 'center',
    color: palette.accent.dark,
    fontSize: '1.2rem',
    padding: '12px 10px 8px 10px',
    textDecoration: 'none',
    '&:hover': {
      color: palette.primary.dark
    }
  },
  navLinkActive: {
    alignItems: 'center',
    color: palette.accent.dark,
    display: 'flex',
    fontSize: '1.2rem',
    fontWeight: 500,
    height: layout.headerHeight,
    padding: '12px 10px 8px 10px'
  }
});

function handleSignin(e) {
  Mixpanel.track('Signup');
}

function handleLogin(e) {
  Mixpanel.track('Login');
}

const Appbar = ({ isLoggedIn, classes, me, router }) => {
  const [showMenu, setShowMenu] = useState('');
  const [width] = useWindowSize();

  if (me) {
    Mixpanel.identify(me.id);
    Mixpanel.people.set({
      $name: me.name,
      $email: me.email
    });
  }

  const Sandwich = () => {
    return (
      <div
        onClick={_ => setShowMenu(s => !s)}
        style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
      >
        <MenuIcon alt="menu" fontSize="large" style={{ color: '#85bdcb' }} />
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className="appbarFlex">
        <Logo />
        {width > 900 ? (
          <NavBarFlexContent
            curretPage={router.pathname}
            me={me}
            mobile={false}
          />
        ) : (
          <Sandwich />
        )}
        {me ? (
          <div component={'div'}>
            <Avatar me={me} compact={true} />
          </div>
        ) : (
          <Link href="/signin">
            <Button
              variant="contained"
              color="secondary"
              className={classNames(classes.loginButton)}
              onClick={handleLogin}
              styles={{ margin: 0 }}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
      {showMenu && width < 900 && (
        <NavBarFlexContent curretPage={router.pathname} me={me} mobile={true} />
      )}
    </div>
  );
};

export default withStyles(styles)(Appbar);
