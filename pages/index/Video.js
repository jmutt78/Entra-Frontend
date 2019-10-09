import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import './index.css';

const DialogTitle = withStyles(theme => ({
  root: {
    margin: 0,
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(50),
    paddingRight: theme.spacing(50),
    paddingBottom: theme.spacing(4)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h4">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {}
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {}
}))(MuiDialogActions);

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
          <div className="videoWrapper">
            <iframe
              title="video"
              src="//www.youtube.com/embed/wVHDvUqcarg?autoplay=1"
              allowFullScreen
              frameBorder="0"
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default Video;
