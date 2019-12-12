import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Link from 'next/link';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '../Avatar';
import NavMenu from './NavMenu';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CreateIcon from '@material-ui/icons/Create';
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
    cursor: 'pointer',
    '@media (max-width: 780px)': {
      maxHeight: 35,
      marginTop: -150
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

function handlenavLinks(e) {
  Mixpanel.track('ask a question');
}

const Appbar = ({ isLoggedIn, classes, me, router }) => {
  const [menu, setMenu] = useState(null);
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
      name: 'Community Ideas',
      target: '/idea/public'
    }
  ];

  const blogLinks = [
    {
      name: 'Entra Tips',
      target: '/blog'
    },

    {
      name: 'Entra Interviews',
      target: '/stories'
    }
  ];

  const createLinks = [
    {
      name: 'Ask a Question',
      target: isLoggedIn ? '/qa' : '/signup'
    },

    {
      name: 'Create Idea',
      target: isLoggedIn ? '/idea/create' : '/signup'
    }
  ];

  const adminLinks = [
    {
      name: 'Approve Questions',
      target: '/approval/question-list'
    },
    {
      name: 'Approve Answers',
      target: '/approval/answer-list'
    }
  ];

  const ideaLinkCondition = () => {
    if (!me) {
      return ideaLinks.filter(link => link.name !== 'My Ideas');
    }
    return ideaLinks;
  };

  const tagExist = me ? me.tags.some(tags => ![' '].includes(tags)) : '';
  const feedLink = () => {
    if (!me) {
      return questionLinks.filter(link => link.name === 'Latest Questions');
    } else if (!tagExist) {
      return questionLinks.filter(link => link.name !== 'My Feed');
    }
    return questionLinks;
  };

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
      <div className="visibleOnMobile" onClick={_ => setMenu(!menu)}>
        <MenuIcon alt="menu" fontSize="large" style={{ color: '#85bdcb' }} />
      </div>
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
        <div className="navbarFlex">
          <div
            className={`navigationContainer ${menu === true && 'menuShown'}`}
            component={'div'}
          >
            <NavMenu
              me={me}
              navLinks={feedLink()}
              curretPage={curretPage}
              name={`Q&A`}
              icon={<QuestionAnswerIcon fontSize="small" />}
            />
            <NavMenu
              me={me}
              navLinks={ideaLinkCondition()}
              curretPage={curretPage}
              name={`Ideas`}
              icon={<EmojiObjectsIcon fontSize="small" />}
            />

            <NavMenu
              me={me}
              navLinks={blogLinks}
              curretPage={curretPage}
              name={`Learn`}
              icon={<MenuBookIcon fontSize="small" />}
            />
            <NavMenu
              me={me}
              navLinks={createLinks}
              curretPage={curretPage}
              name={`Create`}
              icon={<CreateIcon fontSize="small" />}
            />
            {me &&
              me.permissions.some(permission =>
                ['ADMIN', 'MODERATOR'].includes(permission)
              ) && (
                <NavMenu
                  me={me}
                  navLinks={adminLinks}
                  curretPage={curretPage}
                  name={`Admin`}
                />
              )}
            <Search />
          </div>
        </div>
        {!me && (
          <Typography className={classes.subContainer}>
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
        )}
        {me && (
          <div component={'div'}>
            <Avatar me={me} />
          </div>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(Appbar);
