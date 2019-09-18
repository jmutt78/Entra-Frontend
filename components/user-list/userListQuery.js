import gql from 'graphql-tag';
import { perPage } from '../../config.js';

const USER_LIST_QUERY = gql`
  query USER_LIST_QUERY($id: ID!, $filter: String!, $skip: Int = 0, $first: Int = ${perPage}) {
    questions(where: {askedBy_some: {id: $id}}, filter: $filter, first: $first, skip: $skip, orderBy: createdAt_DESC) {
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
