import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import NavLink from './NavLink';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Mixpanel } from '../../utils/Mixpanel';
import './Navbar.css';

const StyledMenu = styled(Menu)`
  &&& {
    ul {
      background: #f2f4ef;
    }
  }
`;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 80px;
  padding: 0 10px;
  color: #6f6f6f;
  max-width: 1920px;

  @media (max-width: 900px) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 30px;
    padding: 0px;
    color: #6f6f6f;
  }
`;

const NavLinkActive = styled(NavLink)`
  height: 20px;
  display: flex;
  align-items: center;
  color: #85bdcb;
  font-weight: 700;
`;

const NavLinkNon = styled.a`
  height: 20px;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #6f6f6f;
  text-decoration: none;
  font-weight: 600;
  padding: 15px 0px 20px 15px;
`;

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

  function handleMix(name) {
    Mixpanel.track(name);
  }
  return (
    <NavBarContainer>
      {!createdNav() && (
        <Typography>
          {navLinks.map(({ name, target, icon, key }) => (
            <NavLinkActive href={target} key={name}>
              <NavLinkNon
                className="navLinkNon"
                onClick={() => {
                  Mixpanel.track(name);
                }}
              >
                {name}
              </NavLinkNon>
            </NavLinkActive>
          ))}
        </Typography>
      )}
      {createdNav() && (
        <div>
          {' '}
          <Typography
            onClick={handleClick}
            style={{
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
            className={selectedData ? 'buttonLink' : 'noActive'}
            aria-controls="simple-menu"
            aria-haspopup="true"
          >
            {selectedData ? selectedData.name : name}
          </Typography>
          <StyledMenu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {navLinks.map(({ name, target }) => (
              <MenuItem value={name} onClick={handleClose} key={name}>
                <NavLinkActive href={target} key={name}>
                  <NavLinkNon
                    style={{ padding: '12px 10px 20px 15px' }}
                    className="navLink"
                    onClick={() => {
                      Mixpanel.track(name);
                    }}
                  >
                    {name}
                  </NavLinkNon>
                </NavLinkActive>
              </MenuItem>
            ))}
          </StyledMenu>
        </div>
      )}
    </NavBarContainer>
  );
}
