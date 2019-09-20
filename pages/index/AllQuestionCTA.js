import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router';

const ViewAll = ({ router }) => {
  return (
    <div className="whyContainer">
      <div className="viewAllContent">
        <button
          className="viewAllButton"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
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
      <hr className="sectionbreak" />
    </div>
  );
};

export default withRouter(ViewAll);
