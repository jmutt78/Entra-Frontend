import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

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
import Avatar from '../Avatar';
import NavMenu from './NavMenu';

function handleSignin(e) {
  Mixpanel.track('Signup');
}

function handleLogin(e) {
  Mixpanel.track('Login');
}

const NavBarContainer = styled(AppBar)`
  &&& {
    width: ${props => props.theme.layout.width};
    min-height: ${props => props.theme.layout.headerHeight};
    background-color: rgb(242, 244, 239);
  }
`;

const ToggleDrawer = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const LogoImg = styled.img`
  height: 45px;
  cursor: pointer;

  @media (max-width: 900px) {
    height: 35px;
    margin-left: 15px;
  }
`;

const GrowPlaceholder = styled.div`
  flex-grow: 1;
  background-color: rgb(242, 244, 239);
`;

const SectionDesktop = styled.div`
  display: flex;
  @media (max-width: 901px) {
    display: none;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;

  @media (max-width: 900px) {
    align-items: flex-start;
    width: 100%;
    padding: 0;
    flex-direction: column;
    display: none;
  }
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 901px) {
    max-height: 35px;
  }
`;

const SignupButton = styled(Button)`
  &&& {
    background-color: #e27d60;
    color: white;
    margin: 10px 5px 10px 5px;
    white-space: nowrap;
    :hover {
      background-color: ${props => props.theme.palette.accent.main};
    }
  }
`;

const LoginButton = styled(Button)`
  &&& {
    margin: 10px 5px 10px 5px;
    background-color: ${props => props.theme.palette.accent.grey};
    :hover {
      background-color: ${props => props.theme.palette.accent.main};
    }
  }
`;

const DrawerList = styled(List)`
  &&& {
    width: 300px;
    height: 100%;
    background-color: rgb(242, 244, 239);
  }
`;

export default function Appbar({ isLoggedIn, me, router }) {
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
    <DrawerList role="presentation" onKeyDown={toggleDrawer(side, false)}>
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
    </DrawerList>
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
    <NavBarContainer position="static">
      <Toolbar>
        <ToggleDrawer>
          <MenuIcon onClick={toggleDrawer('left', true)}></MenuIcon>
        </ToggleDrawer>
        <Link href="/all">
          <LogoImg src="/static/logo.png" alt="entra logo" />
        </Link>
        <GrowPlaceholder />
        <SectionDesktop>
          <NavigationContainer>
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
          </NavigationContainer>
        </SectionDesktop>
        {!me && (
          <SubContainer>
            <Link href="/signin">
              <LoginButton
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleLogin}
              >
                Login
              </LoginButton>
            </Link>

            <Link href="/signup">
              <SignupButton
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleSignin}
              >
                Sign up
              </SignupButton>
            </Link>
          </SubContainer>
        )}
        {me && <Avatar me={me} />}
      </Toolbar>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </NavBarContainer>
  );
}
