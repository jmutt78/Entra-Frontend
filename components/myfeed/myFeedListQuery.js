import gql from 'graphql-tag';

const TAG_LIST_QUERY = gql`
  query TAG_LIST_QUERY(
    $id: [ID!]
    $filter: String!
    $offset: Int
    $limit: Int
  ) {
    questions(
      where: { tags_some: { id_in: $id } }
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
        display
        name
      }
      bookMark {
        id
      }
    }
  }
`;

export default TAG_LIST_QUERY;
