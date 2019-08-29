
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'next/router'
import User from '../../components/auth/User'

const Why = ({ router }) => {
  return (
    <User>
      {({ data: { me } }) => (
        <div className="whyContainer">
          <div className="callToActionContent">
            <h2 className="whyHeader sans">{me ? 'Get involved' : 'Join us today'}</h2>
            <button
              className="heroSignupButton"
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                router.push({
                  pathname: me ? '/qa' : '/signup',
                })
              }}
            >
              <Typography className="heroSignupButtonText"> {me ? 'ASK A QUESTION' : 'SIGNUP NOW'}</Typography>
            </button>
          </div>
        </div>
      )}
    </User>
  )
}

export default withRouter(Why)
