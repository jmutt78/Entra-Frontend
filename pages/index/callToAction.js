import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router';
import User from '../../components/auth/User';
import { Mixpanel } from '../../utils/Mixpanel';

const Why = ({ router }) => {
  return (
    <User>
      {({ data: { me } }) => (
        <div className="whyContainer">
          <div className="callToActionContent">
            <h2 className="whyHeader sans">
              {me
                ? 'Get involved'
                : 'Are You Ready To Bring Your Vision To Life?'}
            </h2>
            <button
              className="heroSignupButton"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                Mixpanel.track('CTA');
                router.push({
                  pathname: me ? '/qa' : '/signup'
                });
              }}
            >
              <Typography className="heroSignupButtonText">
                {' '}
                {me ? 'ASK A QUESTION' : 'CREATE AN ACCOUNT'}
              </Typography>
            </button>
          </div>
        </div>
      )}
    </User>
  );
};

export default withRouter(Why);
