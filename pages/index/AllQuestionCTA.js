import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router';
import { Mixpanel } from '../../utils/Mixpanel';

const ViewAll = ({ router }) => {
  return (
    <div className="whyContainer">
      <div className="viewAllContent">
        <button
          className="viewAllButton"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            Mixpanel.track('View All Questions Landing');
            router.push({
              pathname: '/all'
            });
          }}
        >
          <Typography className="heroSignupButtonText">
            {' '}
            {'VIEW ALL QUESTIONS'}
          </Typography>
        </button>
      </div>
    </div>
  );
};

export default withRouter(ViewAll);
