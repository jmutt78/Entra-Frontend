import React from 'react'
import Typography from "@material-ui/core/Typography"
import { withRouter } from 'next/router'

const Why = () => {
  return (
    <div className="whyContainer">
      <div className="whyContent">
        <h2 className="whyHeader sans">Join us today</h2>
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
      </div>
    </div>
  )
}

export default withRouter(Why)
