import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Link from 'next/link';
import questionQuery from './questionQuery';

export const CREATE_BOUNTY_MUTATION = gql`
  mutation CREATE_BOUNTY_MUTATION($id: ID!, $bountyPoints: Int) {
    createBounty(id: $id, bountyPoints: $bountyPoints) {
      id
    }
  }
`;

const DialogTitle = withStyles(theme => ({
  root: {
    margin: 0,
    paddingTop: theme.spacing(4)
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
    <MuiDialogTitle className={classes.root}>
      <div classsName={classes.titleText}>
        <Typography variant="h6">{children}</Typography>
      </div>
      {onClose ? (
        <IconButton
          aria-label="Close"
          size={'small'}
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
    padding: `0 ${theme.spacing(3)}px`
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2)
  }
}))(MuiDialogActions);

class Bounty extends React.Component {
  state = {
    bountyPoints: '',
    posting: null
  };
  handleChange = e => {
    const int = parseInt(e.target.value, 10);
    this.setState({
      bountyPoints: int
    });
  };

  render() {
    const { open, onClose, classes } = this.props;

    const points = this.props.question.askedBy[0].points;
    return (
      <Mutation
        mutation={CREATE_BOUNTY_MUTATION}
        variables={{ id: this.props.question.id, ...this.state }}
        refetchQueries={[
          {
            query: questionQuery,
            variables: { id: this.props.question.id }
          }
        ]}
      >
        {(createBounty, { error, loading }) => {
          return (
            <Dialog aria-labelledby="customized-dialog-title" open={open}>
              <DialogTitle id="customized-dialog-title" onClose={onClose}>
                Set Bounty Points
              </DialogTitle>
              <DialogContent>
                <label htmlFor="location">
                  <TextField
                    label="Points"
                    type="number"
                    name="points"
                    error={Boolean(error)}
                    value={this.state.bountyPoints}
                    onChange={this.handleChange}
                    style={{
                      width: 250,
                      maxWidth: '100%'
                    }}
                  />
                </label>
                <div style={{ color: 'red' }}>
                  {error && error.message.replace('GraphQL error: ', '')}
                </div>
              </DialogContent>

              <DialogActions>
                <Typography
                  style={{
                    padding: '10px',
                    alignItems: 'center'
                  }}
                >
                  You have {points} points!
                </Typography>
                <Button
                  disabled={loading}
                  variant="contained"
                  onClick={async () => {
                    await createBounty();
                    this.setState({ bountyPoints: '' });
                    onClose();
                  }}
                >
                  Sav{loading ? 'ing' : 'e'}
                </Button>
              </DialogActions>
            </Dialog>
          );
        }}
      </Mutation>
    );
  }
}

export default Bounty;
