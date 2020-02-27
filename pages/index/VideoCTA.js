import React from 'react';
import { withRouter } from 'next/router';
import styled from 'styled-components';

import Video from './Video';
import User from '../../components/auth/User';
import { Mixpanel } from '../../utils/Mixpanel';
import {
  HeroSignupButton,
  HeroSignupButtonText
} from '../../src/styledComponents';

const YoutubeVideoButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  padding: 0 15px 4rem 15px;
`;

class VideoCTA extends React.Component {
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
          <YoutubeVideoButton>
            {me ? null : (
              <HeroSignupButton onClick={this.openCreateTagModal}>
                <HeroSignupButtonText>SEE HOW IT WORKS!</HeroSignupButtonText>
              </HeroSignupButton>
            )}

            <Video
              open={showCreateTagModal}
              onClose={this.closeCreateTagModal}
            />
          </YoutubeVideoButton>
        )}
      </User>
    );
  }
}

export default withRouter(VideoCTA);
