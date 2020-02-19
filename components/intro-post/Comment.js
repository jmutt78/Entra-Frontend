import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';

const Root = styled.div`
  flex-grow: 1;
  max-width: 850px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
`;

export const NameContainer = styled.div`
  padding: 0 0 0 10px;
  a {
    text-decoration: none;
    color: #e27d60;
  }
`;

// TODO:
//1. Set Editing
//2. Set state from child with hooks
//2. controls for edit and delete
//3. delete button
//4. create edit component
export default function Intro({ user, me, comments, commentBy }) {
  const [editing, setEditing] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditing(null);
    setAnchorEl(null);
  };
  return (
    <Root>
      <Paper
        style={{
          background: '#f2f4ef',
          padding: '30px',
          marginLeft: 15,
          marginRight: 15
        }}
      >
        <div>
          <div dangerouslySetInnerHTML={{ __html: comments.body }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MoreVertIcon
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            />
            {commentBy.image === null || commentBy.image === '' ? (
              <Avatar
                style={{
                  width: 50,
                  height: 50,
                  cursor: 'pointer'
                }}
              >
                {commentBy.display[0]}
              </Avatar>
            ) : (
              <Avatar
                alt={commentBy.name}
                src={commentBy.image}
                style={{
                  width: 50,
                  height: 50,
                  cursor: 'pointer'
                }}
              />
            )}
            <NameContainer>
              <Link
                href={{
                  pathname: '/user',
                  query: { id: commentBy.id }
                }}
              >
                <a>{commentBy.display}</a>
              </Link>{' '}
              on{' '}
              <span>
                {format(parseISO(comments.createdAt), 'MMMM dd, yyyy')}
              </span>
            </NameContainer>
          </div>
        </div>
        <div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
        </div>
      </Paper>
    </Root>
  );
}
