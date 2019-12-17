import gql from 'graphql-tag';

const USER_LIST_QUERY = gql`
  query USER_LIST_QUERY($id: ID!, $filter: String!, $offset: Int, $limit: Int) {
    questions(
      where: { askedBy_some: { id: $id } }
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
`;

export default USER_LIST_QUERY;
