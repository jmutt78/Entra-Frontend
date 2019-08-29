import React from 'react'

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
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  router.push({
                    pathname: '/signup',
                  })
                }}
              >
                Signup
              </button>
            )}
          </div>
        </div>
      )}
    </User>
  )
}

export default withRouter(Hero)
