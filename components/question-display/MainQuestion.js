import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { CURRENT_USER_QUERY } from '../auth/User'
import UserQuestion from './UserQuestion'
import NoQuestion from './NoUserQuestion'

class MainQuestion extends Component {
  render() {
    const question = this.props.question

    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>

          return data.me ? (
            <UserQuestion question={question} user={data.me} />
          ) : (
            <NoQuestion question={question} />
          )
        }}
      </Query>
    )
  }
}

export default MainQuestion
