import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router';
import Router from 'next/router';

import Video from './Video';
import User from '../../components/auth/User';
import { Mixpanel } from '../../utils/Mixpanel';

class Hero extends React.Component {
  state = {
    showCreateTagModal: false
  };

  openCreateTagModal = () => {
    this.setState({ showCreateTagModal: true });
    Mixpanel.track('See How');
  };
  closeCreateTagModal = () => {
    this.setState({ showCreateTagModal: false });
  };

  render() {
    const { showCreateTagModal } = this.state;
    return (
      <User>
        {({ data: { me } }) => (
          <div className="heroContainer">
            <div className="heroContent">
              <h1 className="heroHeader sans">Entra</h1>
              <p className="heroText serif">
                The crowd-sourcing Q & A platform where we can all learn to be
                better: better marketers, better professionals, better mentors,
                and better business owners.
              </p>

              {me ? null : (
                <button
                  className="heroSignupButton"
                  onClick={this.openCreateTagModal}
                >
                  <Typography className="heroSignupButtonText">
                    SEE HOW IT WORKS!
                  </Typography>
                </button>
              )}
            </div>
            <Video
              open={showCreateTagModal}
              onClose={this.closeCreateTagModal}
            />
          </div>
        )}
      </User>
    );
  }
}

export default withRouter(Hero);
