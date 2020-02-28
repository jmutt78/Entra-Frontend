import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Typography from '@material-ui/core/Typography';

import Signout from './auth/Signout';

const Root = styled.div`
  display: flex;
`;

const AvatarContainer = styled(Typography)`
  &&& {
    ${({ small }) =>
      small !== null &&
      `display: flex;
      align-items: center;
      padding: 5px 17px 0 0;
      font-size: 1rem;
      align-self: flex-end;
      cursor: pointer;
      font-weight: 600;`}
  }
`;

const StyledAvatar = styled(Avatar)`
  &&& {
    margin: 15px;
    width: 45px;
    height: 45px;
    background-color: #85bdcb;
    cursor: pointer;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  &&& {
    font-size: 0.85rem;
    font-weight: 600;
    color: #6f6f6f;
  }
`;

const ExternalLink = styled.a`
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6f6f6f;
`;

export default function MyProfile({ me, small }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  function handleImage(me) {
    if (!me) {
      return null;
    }
    if (me.image == null || me.image == '') {
      return <StyledAvatar>{me.name[0]}</StyledAvatar>;
    }
    return <StyledAvatar alt="Remy Sharp" src={me.image} />;
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Root>
      <div
        onClick={small ? null : handleToggle}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
      >
        <AvatarContainer small={small} component={'div'}>
          {handleImage(me)}
          {small ? null : (
            <div>
              <ArrowDropDownIcon />
            </div>
          )}
        </AvatarContainer>
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <Link href="/account/myaccount">
                    <StyledMenuItem onClick={handleClose}>
                      My Profile
                    </StyledMenuItem>
                  </Link>
                  <Divider />
                  <Link href="/myquestions">
                    <StyledMenuItem onClick={handleClose}>
                      My Questions
                    </StyledMenuItem>
                  </Link>
                  <Link href="/myanswers">
                    <StyledMenuItem onClick={handleClose}>
                      My Answers
                    </StyledMenuItem>
                  </Link>
                  <Link href="/mybookmarks">
                    <StyledMenuItem onClick={handleClose}>
                      Bookmarks
                    </StyledMenuItem>
                  </Link>
                  <Divider />
                  <Link href="https://entra.drift.help">
                    <ExternalLink
                      href="https://entra.drift.help"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <StyledMenuItem onClick={handleClose}>
                        Help
                      </StyledMenuItem>
                    </ExternalLink>
                  </Link>

                  <StyledMenuItem>
                    <Signout />
                  </StyledMenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Root>
  );
}
