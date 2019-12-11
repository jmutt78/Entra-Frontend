import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import NavLink from './NavLink';
import './Navbar.css';

export default function IdeaMenu({ me, createLinks, classes, curretPage }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedData =
    createLinks[
      createLinks
        .map(function(item) {
          return item.target;
        })
        .indexOf(curretPage)
    ];

  return (
    <div>
      <div className="navbarFlex">
        <Typography
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
          className={selectedData ? 'buttonLink' : null}
          variant="h6"
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          {selectedData ? selectedData.name : `Create`}
        </Typography>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {createLinks.map(({ name, target }) => (
            <MenuItem className="dropDown" value={name} onClick={handleClose}>
              <NavLink activeClassName="navLinkActive" href={target} key={name}>
                <a className="navLink">{name}</a>
              </NavLink>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}
