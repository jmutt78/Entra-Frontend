import React from 'react'
import Typography from "@material-ui/core/Typography"
import { withRouter } from 'next/router'

import User from '../../components/auth/User'

const Hero = ({ router }) => {
  return (
    <User>
      {({ data: { me } }) => (
        <div className="heroContainer">
          <div className="heroContent">
            <h1 className="heroHeader sans">Entra</h1>
            <p className="heroText serif">Get inspired. Get help. Grow.</p>
            <p className="heroText serif">
              Entra is currently in private beta. Signup to reserve your invitation
            </p>
            {me ? null : (
              <button
                className="heroSignupButton"
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  router.push({
                    pathname: '/signup',
                  })
                }}
              >
                <Typography className="heroSignupButtonText">SIGNUP NOW</Typography>
              </button>
            )}
          </div>
        </div>
      )}
    </User>
  )
}

export default withRouter(Hero)
