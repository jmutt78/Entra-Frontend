import gql from 'graphql-tag';

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
        email
      }
      createdAt
      bookMark {
        id
      }
      answers(orderBy: selected_DESC) {
        answeredTo {
          id
        }
        id
        body
        createdAt
        approval
        selected
        upVotes
        downVotes
        answeredBy: answeredBy {
          id
          name
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
