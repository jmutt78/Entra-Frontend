import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import NavLink from './NavLink';
import Icon from '@material-ui/core/Icon';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './Navbar.css';

export default function NavMenu({
  me,
  navLinks,
  classes,
  curretPage,
  name,
  icon
}) {
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

  return (
    <div>
      <div className="navbarFlex">
        {!createdNav() && (
          <Typography>
            {navLinks.map(({ name, target }) => (
              <NavLink activeClassName="navLinkActive" href={target} key={name}>
                <a className="navLink">{name}</a>
              </NavLink>
            ))}
          </Typography>
        )}
        {createdNav() && (
          <div>
            {' '}
            <Typography
              onClick={handleClick}
              style={{ cursor: 'pointer' }}
              className={selectedData ? 'buttonLink' : null}
              aria-controls="simple-menu"
              aria-haspopup="true"
            >
              {icon}
              {selectedData ? selectedData.name : name}
              <ArrowDropDownIcon />
            </Typography>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {navLinks.map(({ name, target }) => (
                <MenuItem
                  className="dropDown"
                  value={name}
                  onClick={handleClose}
                >
                  <NavLink
                    activeClassName="navLinkActive"
                    href={target}
                    key={name}
                  >
                    <a className="navLink">{name}</a>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
}
