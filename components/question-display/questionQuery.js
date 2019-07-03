import gql from "graphql-tag";

const SINGLE_QUESTION_QUERY = gql`
  query SINGLE_QUESTION_QUERY($id: ID!) {
    question(id: $id) {
      id
      title
      description
      approval
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
        approval
        upVotes
        downVotes
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
