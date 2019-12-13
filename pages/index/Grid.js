import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router';
import { Mixpanel } from '../../utils/Mixpanel';

const Grid = ({
  image,
  head,
  sub,
  alignment,
  sections,
  alt,
  buttonText,
  buttonLink,
  mixtag,
  router
}) => {
  return (
    <div>
      <div
        className={`gridContainer ${
          alignment === 'left' ? 'gridContainerLeft' : 'gridContainerRight'
        }`}
      >
        <div className="gridContent">
          <h3 className="gridHeader sans">{head}</h3>

          {sections.map(({ icon, body, alt }, key) => (
            <div key={key} style={{ padding: '1rem 0' }}>
              <img src={icon} alt={alt} style={{ maxWidth: 60 }} />

              <div className="gridSectionBody serif">{body}</div>
            </div>
          ))}
          <button className="veiwButton">
            {' '}
            <Typography
              className="heroSignupButtonText"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                Mixpanel.track(mixtag);
                router.push({
                  pathname: buttonLink
                });
              }}
            >
              {buttonText}
            </Typography>
          </button>
        </div>

        <div
          className="gridImageContainer"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
    </div>
  );
};

export default withRouter(Grid);
