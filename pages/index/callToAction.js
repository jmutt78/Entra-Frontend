import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import User from '../../components/auth/User';
import { Mixpanel } from '../../utils/Mixpanel';
import { HeroSignupButton, HeroSignupButtonText } from './styledComponents';

const WhyContainer = styled.div`
  width: 100vw;
  background: #f2f4ef;
  overflow: hidden;
`;

const CallToActionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 60px 0;
`;

const WhyHeader = styled.h2`
  font-size: 2.8em;
  font-weight: 700;
  color: #343434;
  font-variant-ligatures: common-ligatures;
  padding: 0 70px 50px 70px;
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';

  @media (max-width: 800px) {
    font-size: 1.8em;
    font-weight: 700;
    color: #343434;
    font-variant-ligatures: common-ligatures;
    padding: 0 10px 0px 10px;
  }
`;

const Why = ({ router }) => {
  return (
    <User>
      {({ data: { me } }) => (
        <WhyContainer>
          <CallToActionContent>
            <WhyHeader>
              {me
                ? 'Get involved'
                : 'Are You Ready To Bring Your Vision To Life?'}
            </WhyHeader>
            <HeroSignupButton
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                Mixpanel.track('CTA');
                router.push({
                  pathname: me ? '/qa' : '/signup'
                });
              }}
            >
              <HeroSignupButtonText>
                {' '}
                {me ? 'ASK A QUESTION' : 'CREATE AN ACCOUNT'}
              </HeroSignupButtonText>
            </HeroSignupButton>
          </CallToActionContent>
        </WhyContainer>
      )}
    </User>
  );
};

export default withRouter(Why);
