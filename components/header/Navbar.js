import React, { useState } from 'react';
import { Query } from 'react-apollo';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import NavLink from './NavLink';

import Avatar from '../Avatar';
import Notification from '../Notifications';
import { CURRENT_USER_QUERY } from '../auth/User';

import './Navbar.css';

const styles = ({ layout, palette }) => ({
  root: {
    width: '100%', //layout.width,
    background: '#85bdcb', //palette.accent.blue,
    minHeight: 80, //layout.headerHeight,
    display: 'flex'
  },
  navText: {
    color: 'white',
    marginLeft: '2rem',
    position: 'relative',
    zIndex: 2,
    textDecoration: 'none',
    fontSize: 20,
    fontWieght: 'strong'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 35px 0 0',
    color: 'white',
    fontSize: '1.1rem',
    alignSelf: 'flex-end'
  }
});

const Navbar = ({ classes }) => {
  const [menu, setMenu] = useState(null);

  const navLinks = [
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
  const feedLink = [
    {
      name: 'My Feed',
      target: '/myfeed'
    }
  ];

  return (
    <div className="style-target" style={{ width: '100%' }}>
      <Query query={CURRENT_USER_QUERY}>
        {({ data: { me }, loading }) => (
          <div className={classes.root}>
            <div className="visibleOnMobile" onClick={_ => setMenu(!menu)}>
              <img
                src="static/menu.svg"
                alt="menu"
                style={{ width: 40, height: 40 }}
              />
            </div>
            <div className="navbarFlex">
              <Typography
                className={`navigationContainer ${menu === true &&
                  'menuShown'}`}
                component={'div'}
              >
                {me &&
                  me.permissions.some(permission =>
                    ['ADMIN', 'MODERATOR'].includes(permission)
                  ) &&
                  adminLinks.map(({ name, target }) => (
                    <NavLink
                      activeClassName="navLinkActive"
                      href={target}
                      key={name}
                    >
                      <a className="navLink">{name}</a>
                    </NavLink>
                  ))}
                {me.tags.some(tags => ![' '].includes(tags)) &&
                  feedLink.map(({ name, target }) => (
                    <NavLink
                      activeClassName="navLinkActive"
                      href={target}
                      key={name}
                    >
                      <a className="navLink">{name}</a>
                    </NavLink>
                  ))}
                {navLinks.map(({ name, target }) => (
                  <NavLink
                    activeClassName="navLinkActive"
                    href={target}
                    key={name}
                  >
                    <a className="navLink">{name}</a>
                  </NavLink>
                ))}
              </Typography>

              {me && (
                <Typography
                  className={classes.avatarContainer}
                  component={'div'}
                >
                  <Notification me={me.myNotifications} />
                  <Avatar me={me} />
                  <div>{me.name}</div>
                </Typography>
              )}
            </div>
          </div>
        )}
      </Query>
    </div>
  );
};

export default withStyles(styles)(Navbar);
