import React, { Component } from 'react'
import { Query } from 'react-apollo'
import QuestionList from '../../components/question-list'
import Error from '../../components/ErrorMessage'
import CircularProgress from '@material-ui/core/CircularProgress'
import query from './query'

class Questions extends Component {
  render() {
    return (
      <Query query={query}>
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />
          if (error) return <Error error={error} />
          return <QuestionList questions={data.questions} filter={'all'} page="1" name={'Latest Questions'} />
        }}
      </Query>
    )
  }
}

export default Questions
