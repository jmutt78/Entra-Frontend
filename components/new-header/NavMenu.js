import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import NavLink from './NavLink';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import { Mixpanel } from '../../utils/Mixpanel';
import './Navbar.css';

const useStyles = makeStyles({
  paper: {
    background: '#f2f4ef'
  }
});

export default function NavMenu({
  me,
  navLinks,
  classes,
  curretPage,
  name,
  icon
}) {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedData =
    navLinks[
      navLinks
        .map(function(item) {
          return item.target;
        })
        .indexOf(curretPage)
    ];

  const createdNav = () => {
    if ((!me && name === 'Learn') || (!me && name === 'Create')) {
      return true;
    } else if (me) {
      return true;
    }
  };

  function handleMix(name) {
    Mixpanel.track(name);
  }
  return (
    <div className="navbarFlex">
      {!createdNav() && (
        <Typography>
          {navLinks.map(({ name, target, icon }) => (
            <NavLink activeClassName="navLinkActive" href={target} key={name}>
              <a
                className="navLinkNon"
                nClick={() => {
                  Mixpanel.track(name);
                }}
              >
                {name}
              </a>
            </NavLink>
          ))}
        </Typography>
      )}
      {createdNav() && (
        <div>
          {' '}
          <Typography
            onClick={handleClick}
            as={'div'}
            style={{ cursor: 'pointer', display: 'flex' }}
            className={selectedData ? 'buttonLink' : 'noActive'}
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            <span style={{ paddingRight: 5 }}>{icon}</span>
            <span>{selectedData ? selectedData.name : name}</span>
            <ArrowDropDownIcon />
          </Typography>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            classes={{ paper: styles.paper }}
          >
            {navLinks.map(({ name, target }) => (
              <MenuItem value={name} onClick={handleClose}>
                <NavLink
                  activeClassName="navLinkActive"
                  href={target}
                  key={name}
                >
                  <a
                    className="navLink"
                    onClick={() => {
                      Mixpanel.track(name);
                    }}
                  >
                    {name}
                  </a>
                </NavLink>
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}
    </div>
  );
}
