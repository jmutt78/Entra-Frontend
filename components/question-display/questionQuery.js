import gql from "graphql-tag";

const SINGLE_QUESTION_QUERY = gql`
  query SINGLE_QUESTION_QUERY($id: ID!) {
    question(where: { id: $id }) {
      id
      title
      description
      askedBy {
        id
        display
        image
        name
      }
      createdAt
      answers {
        id
        body
        createdAt
        answeredBy: answeredBy {
          id
          display
          image
          createdAt
        }
      }
      tags {
        id
        name
      }
      upVotes
      downVotes
      views
    }
  }
`;

export default SINGLE_QUESTION_QUERY;