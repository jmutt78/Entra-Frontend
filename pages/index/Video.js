import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import YouTube from 'react-youtube';

const DialogTitle = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(4)
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
  root: {
    margin: 0,
    padding: `0 ${theme.spacing(6)}px`,
    minHeight: '50vh',
    maxHeight: '50vh',
    maxWidth: '100%'
  },
  container: {
    position: 'relative',
    overflow: 'hidden',
    paddingTop: ' 56.25%'
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(4)
  }
}))(MuiDialogActions);

class Video extends React.Component {
  videoOnReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    // event.target.playVideo();
  }

  render() {
    const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
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
          <div className="container">
            <YouTube
              videoId="wVHDvUqcarg"
              opts={opts}
              onReady={this.videoOnReady}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default Video;
