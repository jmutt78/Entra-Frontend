import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InsertLinkIcon from '@material-ui/icons/InsertLink';

const Container = styled.div`
  cursor: pointer;
`;

const PopContainer = styled.div`
  padding: 20px;
`;

const SpanStyle = styled.span`
background: #eef8ff
border-bottom: 1px dotted #e27d60;
`;
const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

export default function SimplePopover({
  entityKey,
  contentState,
  children,
  onEdit,
  onRemove,
  icon,
  label
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // const { entityKey, contentState } = this.props;

  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <div>
      <InsertLinkIcon
        aria-describedby={id}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
      <SpanStyle>{children}</SpanStyle>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <PopContainer>
          <a
            href={url}
            title={url}
            target="_blank"
            rel="noopener noreferrer"
            className="Tooltip__link"
          >
            {label}
          </a>

          <Button type="button" onClick={onEdit.bind(null, entityKey)}>
            Edit
          </Button>

          <Button onClick={onRemove.bind(null, entityKey)}>Remove</Button>
        </PopContainer>
      </Popover>
    </div>
  );
}
