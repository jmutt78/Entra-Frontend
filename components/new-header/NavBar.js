import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CreateIcon from '@material-ui/icons/Create';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Mixpanel } from '../../utils/Mixpanel';
import './Appbar.css';
import classNames from 'classnames';
import Avatar from '../Avatar';
import NavMenu from './NavMenu';
import './Navbar.css';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    backgroundColor: 'rgb(242, 244, 239)'
  },
  drawer: {
    backgroundColor: 'rgb(242, 244, 239)'
  },
  list: {
    width: 300,
    backgroundColor: 'rgb(242, 244, 239)'
  },

  sectionDesktop: {
    display: 'flex',
    '@media (max-width: 901px)': {
      display: 'none'
    }
  },
  sectionMobile: {
    display: 'none',
    '@media (max-width: 901px)': {
      display: 'flex'
    }
  },
  root: {
    width: theme.layout.width,
    minHeight: theme.layout.headerHeight,
    backgroundColor: 'rgb(242, 244, 239)'
  },
  subContainer: {
    display: 'flex',

    alignItems: 'center',
    '@media (max-width: 901px)': {
      maxHeight: 35,
      marginTop: 20
    }
  },
  hidden: {
    visibility: 'hidden'
  },
  button: {
    margin: 12
  },
  signupButton: {
    backgroundColor: '#E27D60',
    color: 'white',
    margin: '10px 5px 10px 5px ',
    '&:hover': {
      backgroundColor: theme.palette.accent.main
    }
  },
  loginButton: {
    margin: '10px 5px 10px 5px ',
    backgroundColor: theme.palette.accent.grey,
    '&:hover': {
      backgroundColor: theme.palette.accent.main
    }
  },
  logo: {
    maxHeight: 45,
    cursor: 'pointer',
    '@media (max-width: 901px)': {
      maxHeight: 35,
      marginTop: 20,
      marginLeft: 15
    }
  },

  navLink: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.accent.dark,
    fontSize: '1.2rem',
    padding: '12px 10px 8px 10px',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.dark
    }
  },
  navLinkActive: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '1.2rem',
    fontWeight: 500,
    height: theme.layout.headerHeight,
    padding: '12px 10px 8px 10px'
  }
}));

function handleSignin(e) {
  Mixpanel.track('Signup');
}

function handleLogin(e) {
  Mixpanel.track('Login');
}

export default function Appbar({ isLoggedIn, me, router }) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    left: false
  });
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
      name: 'Leaderboard',
      target: '/leaderboard'
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
    },
    {
      name: 'Approve Posts',
      target: '/approval/post-list'
    },
    {
      name: 'Approve Comments',
      target: '/approval/comment-list'
    }
  ];

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <QuestionAnswerIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <NavMenu
                me={me}
                key={`Community`}
                navLinks={feedLink()}
                curretPage={curretPage}
                name={`Community`}
              />
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EmojiObjectsIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <NavMenu
                me={me}
                navLinks={ideaLinkCondition()}
                curretPage={curretPage}
                name={`Ideas`}
                key={`Ideas`}
              />
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <NavMenu
                me={me}
                navLinks={blogLinks}
                curretPage={curretPage}
                name={`Learn`}
                key={`Learn`}
              />
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <NavMenu
                me={me}
                navLinks={createLinks}
                curretPage={curretPage}
                name={`Create`}
                key={`Create`}
              />
            }
          />
        </ListItem>

        {me &&
          me.permissions.some(permission =>
            ['ADMIN', 'MODERATOR'].includes(permission)
          ) && (
            <ListItem>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <NavMenu
                    me={me}
                    navLinks={adminLinks}
                    curretPage={curretPage}
                    name={`Admin`}
                  />
                }
              />
            </ListItem>
          )}
      </List>
    </div>
  );

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
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <div className="sectionMobile">
            <MenuIcon onClick={toggleDrawer('left', true)}></MenuIcon>
          </div>
          <div className="subContainer">
            <Typography variant="h6" className={classes.logoContainer}>
              <Link href="/all">
                <img src="/static/logo.png" className="logo" alt="entra logo" />
              </Link>
            </Typography>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className="navigationContainer">
              <NavMenu
                me={me}
                key={`Community`}
                navLinks={feedLink()}
                curretPage={curretPage}
                name={`Community`}
                icon={<QuestionAnswerIcon fontSize="small" />}
              />
              <NavMenu
                me={me}
                navLinks={ideaLinkCondition()}
                curretPage={curretPage}
                name={`Ideas`}
                key={`Ideas`}
                icon={<EmojiObjectsIcon fontSize="small" />}
              />

              <NavMenu
                me={me}
                navLinks={blogLinks}
                curretPage={curretPage}
                name={`Learn`}
                key={`Learn`}
                icon={<MenuBookIcon fontSize="small" />}
              />
              <NavMenu
                me={me}
                navLinks={createLinks}
                curretPage={curretPage}
                name={`Create`}
                key={`Create`}
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
            </div>
          </div>
          {!me && (
            <div className={classes.subContainer}>
              <Link href="/signin">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
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
                  size="small"
                  className={classes.signupButton}
                  onClick={handleSignin}
                >
                  Sign up
                </Button>
              </Link>
            </div>
          )}
          {me && (
            <div component={'div'}>
              <Avatar me={me} />
            </div>
          )}
        </Toolbar>
        <SwipeableDrawer
          classes={{ paper: classes.drawer }}
          open={state.left}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          {sideList('left')}
        </SwipeableDrawer>
      </AppBar>
    </div>
  );
}
