import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import './index.css';

const DialogTitle = props => {
  const { children, onClose } = props;
  return (
    <DialogTitleContainer disableTypography>
      <Typography variant="h4">{children}</Typography>
      {onClose ? (
        <CloseIconButton aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </CloseIconButton>
      ) : null}
    </DialogTitleContainer>
  );
};

const DialogContent = withStyles(theme => ({
  root: {}
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {}
}))(MuiDialogActions);

const DialogTitleContainer = styled(MuiDialogTitle)`
  &&& {
    margin: 0;
    padding-top: ${props => props.theme.spacing(2)}px;
    padding-left: ${props => props.theme.spacing(50)}px;
    padding-right: ${props => props.theme.spacing(50)}px;
    padding-bottom: ${props => props.theme.spacing(4)}px;
  }
`;

const CloseIconButton = styled(IconButton)`
  &&& {
    position: absolute;
    right: ${props => props.theme.spacing(1)}px;
    top: ${props => props.theme.spacing(1)}px;
    color: ${props => props.theme.palette.grey[500]};
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 5px;
  height: 0;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

class Video extends React.Component {
  videoOnReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    // event.target.playVideo();
  }

  render() {
    const { open, onClose, classes } = this.props;
    return (
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={'md'}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={onClose}
        ></DialogTitle>{' '}
        <DialogContent>
          <VideoWrapper>
            <iframe
              title="video"
              src="//www.youtube.com/embed/S7czmN39cCE?autoplay=1"
              allowFullScreen
              frameBorder="0"
              allow="autoplay; encrypted-media"
            ></iframe>
          </VideoWrapper>
        </DialogContent>
      </Dialog>
    );
  }
}

export default Video;
