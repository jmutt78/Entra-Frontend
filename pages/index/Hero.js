import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router';

import User from '../../components/auth/User';
import { Mixpanel } from '../../utils/Mixpanel';

const Hero = ({ router }) => {
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
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  Mixpanel.track('Ask A Question Hero');
                  router.push({
                    pathname: '/signup'
                  });
                }}
              >
                <Typography className="heroSignupButtonText">
                  ASK A QUESTION NOW
                </Typography>
              </button>
            )}
          </div>
        </div>
      )}
    </User>
  );
};

export default withRouter(Hero);
