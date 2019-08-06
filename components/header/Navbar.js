import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import PhoneIcon from '@material-ui/icons/Phone'

import Avatar from './Avatar'
import User from '../auth/User.js'

import './Navbar.css'

const styles = ({ layout, palette }) => ({
  appbar: {
    background: '#85BDCB',
    boxShadow: 'none',
  },
  text: {
    flexGrow: 100,
    color: 'white',
    fontSize: 16,
  },
  navText: {
    color: 'white',
    fontSize: '1.5rem',
    marginLeft: '2rem',
    position: 'relative',
    zIndex: 2,
    textDecoration: 'none',
    fontSize: 20,
    fontWieght: 'strong',
  },

  // own
  container: {
    width: layout.width,
    height: layout.navHeight,
    display: 'flex',
    alignItems: 'center',
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px 0 0',
  },
  navigationContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    padding: '0 25px'
  },
})

const Navbar = ({ classes }) => {
  const [value, setValue] = React.useState(2)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const navLinks = [
    {
      name: 'My Questions',
      target: '/myquestions',
    },
    {
      name: 'My Answers',
      target: '/myanswers',
    },
    {
      name: 'My Bookmarks',
      target: '/mybookmarks',
    },
  ]

  const adminLinks = [
    {
      name: 'Approve Questions',
      target: '/approval/question-list',
    },
    {
      name: 'Approve Answers',
      target: '/approval/answer-list',
    },
  ]

  return (
    <div className="style-target" style={{ width: '100%' }}>
      <User>
        {({ data: { me } }) => (
          <AppBar className={classes.appbar} position="static">
            <div className={classes.container}>
              <div className={classes.navigationContainer}>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                  aria-label="disabled tabs example"
                >
                  {me.permissions.some(permission => ['ADMIN', 'MODERATOR'].includes(permission)) &&
                    adminLinks.map(({ name, target }) => <Tab icon={<PhoneIcon />} label={name} />)}

                  {navLinks.map(({ name, target }) => (
                    <Tab icon={<PhoneIcon />} label={name} />
                  ))}
                </Tabs>
              </div>
              <div className={classes.avatarContainer}>
                <Avatar me={me} />
                <Typography variant="h4" className={classes.text} style={{paddingTop: 3}}>
                  <p>{me.name}</p>
                </Typography>
              </div>
            </div>
          </AppBar>
        )}
      </User>
    </div>
  )
}

export default withStyles(styles)(Navbar)
