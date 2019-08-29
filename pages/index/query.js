import gql from 'graphql-tag'

export default gql`
  query QUESTION_LIST_QUERY {
    questions(filter: "all", first: 5) {
      id
      title
      description
      createdAt

      approval
      answers {
        id
        body
      }
      tags {
        id
        name
      }
      views
      upVotes
      downVotes
      askedBy {
        id
        name
        display
      }
      bookMark {
        id
      }
    }
  }
`
