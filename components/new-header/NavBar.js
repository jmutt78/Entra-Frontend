import React from 'react';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Link from 'next/link';
// import NavLink from './NavLink';
import Avatar from '../Avatar';
import QuestionMenu from './QuestionMenu';
import IdeaMenu from './IdeaMenu';
import LearnMenu from './LearnMenu';
import CreateMenu from './CreateMenu';
import classNames from 'classnames';
import { Mixpanel } from '../../utils/Mixpanel';
import './Appbar.css';
import Search from '../search/QuestionSearch';

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
    margin: 12,
    backgroundColor: palette.accent.grey,
    '&:hover': {
      backgroundColor: palette.accent.main
    }
  },
  logo: {
    maxHeight: 45,
    cursor: 'pointer'
  },
  logoContainer: {
    padding: '12px 0 0 0'
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

function handlenavLinks(e) {
  Mixpanel.track('ask a question');
}

const Appbar = ({ isLoggedIn, classes, me, router }) => {
  const navLinks = [
    {
      name: 'Blog',
      target: '/blog'
    },
    {
      name: 'Stories',
      target: '/stories'
    }
  ];

  const questionLinks = [
    {
      name: 'My Feed',
      target: '/myfeed'
    },

    {
      name: 'Latest Questions',
      target: '/all'
    },
    {
      name: 'My Questions',
      target: '/myquestions'
    },
    {
      name: 'My Answers',
      target: '/myanswers'
    },
    {
      name: 'My Bookmarks',
      target: '/mybookmarks'
    }
  ];

  const ideaLinks = [
    {
      name: 'My Ideas',
      target: '/idea/my-ideas'
    },

    {
      name: 'Public Ideas',
      target: '/idea/public'
    }
  ];

  const blogLinks = [
    {
      name: 'Our Blog',
      target: '/blog'
    },

    {
      name: 'Stories',
      target: '/stories'
    }
  ];

  const createLinks = [
    {
      name: 'Create Question',
      target: '/qa'
    },

    {
      name: 'Create Idea',
      target: '/idea/create'
    }
  ];

  const curretPage = router.pathname;

  if (me) {
    Mixpanel.identify(me.id);
    Mixpanel.people.set({
      $name: me.name,
      $email: me.email
    });
  }
  return (
    <div className={classes.root}>
      <div className="appbarFlex">
        <div className="subContainer">
          <Typography variant="h6" className={classes.logoContainer}>
            <Link href="/all">
              <img
                src="/static/logo.png"
                className={classes.logo}
                alt="entra logo"
              />
            </Link>
          </Typography>
        </div>
        <QuestionMenu
          me={me}
          questionLinks={questionLinks}
          curretPage={curretPage}
        />
        <IdeaMenu me={me} ideaLinks={ideaLinks} curretPage={curretPage} />
        <Search />
        <LearnMenu me={me} blogLinks={blogLinks} curretPage={curretPage} />
        <CreateMenu me={me} createLinks={createLinks} curretPage={curretPage} />
        <Typography
          className={classes.subContainer}
          component={'div'}
        ></Typography>
        <Typography className={me ? classes.hidden : classes.subContainer}>
          <Link href="/signin">
            <Button
              variant="contained"
              color="secondary"
              className={classNames(classes.loginButton, 'login-btn')}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Link>

          <Link href="/signup">
            <Button
              variant="contained"
              color="secondary"
              className={classes.signupButton}
              onClick={handleSignin}
            >
              Sign up
            </Button>
          </Link>
        </Typography>
        {me && (
          <div className={classes.avatarContainer} component={'div'}>
            <Avatar me={me} />
          </div>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(Appbar);
