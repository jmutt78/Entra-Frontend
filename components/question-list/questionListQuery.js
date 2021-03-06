import gql from 'graphql-tag';

const QUESTION_LIST_QUERY = gql`
  query QUESTION_LIST_QUERY($filter: String!, $offset: Int, $limit: Int) {
    questions(
      filter: $filter
      orderBy: createdAt_DESC
      limit: $limit
      offset: $offset
    ) {
      id
      title
      description
      createdAt
      approval
      bountyPoints
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
        image
      }
      bookMark {
        id
      }
    }
  }
`;

export default QUESTION_LIST_QUERY;
