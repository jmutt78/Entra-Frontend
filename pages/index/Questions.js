import React from 'react'
import { Query } from 'react-apollo'
import QuestionList from '../../components/question-list'
import Error from '../../components/ErrorMessage'
import CircularProgress from '@material-ui/core/CircularProgress'
import query from './query'

const styles = {
  container: {
    padding: 20,
    // TEMP
    overflowX: 'hidden',
  },
}

export default () => (
  <Query query={query}>
    {({ data, loading, error }) => {
      if (loading) return <CircularProgress style={{ margin: 20 }} />
      if (error) return <Error error={error} />
      return (
        <div style={styles.container}>
          <QuestionList questions={data.questions} filter={'all'} page="1" name={'Latest Questions'} />
        </div>
      )
    }}
  </Query>
)
