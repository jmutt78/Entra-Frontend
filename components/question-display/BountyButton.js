import React from 'react';

import { withRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Bounty from './Bounty';
import { Mixpanel } from '../../utils/Mixpanel';

export class BountyButton extends React.Component {
  state = {
    showCreateTagModal: false
  };

  openCreateTagModal = () => {
    this.setState({ showCreateTagModal: true });
    Mixpanel.track('Create Bounty');
  };
  closeCreateTagModal = () => {
    this.setState({ showCreateTagModal: false });
  };

  render() {
    const { showCreateTagModal } = this.state;
    return (
      <div>
        <Button
          style={{ paddingLeft: '15px', backgroundColor: 'transparent' }}
          size="medium"
          onClick={this.openCreateTagModal}
        >
          Create Bounty
        </Button>
        <Bounty
          open={showCreateTagModal}
          onClose={this.closeCreateTagModal}
          question={this.props.question}
        />
      </div>
    );
  }
}

export default withRouter(BountyButton);
