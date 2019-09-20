import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router';

import User from '../../components/auth/User';

const Hero = ({ router }) => {
  return (
    <User>
      {({ data: { me } }) => (
        <div className="heroContainer">
          <div className="heroContent">
            <h1 className="heroHeader sans">Entra</h1>
            <p className="heroText serif">
              It’s Not Just You And The “Big Bad World” Anymore. You’ve Found
              Your New Home.
            </p>

            {me ? null : (
              <button
                className="heroSignupButton"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
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
