import gql from 'graphql-tag';
import { perPage } from '../../config.js';

const QUESTION_LIST_QUERY = gql`
  query QUESTION_LIST_QUERY($filter: String!, $skip: Int = 0, $first: Int = ${perPage}, $searchScope: String, $searchTerm: String, $sortBy: String) {
    questions(filter: $filter, first: $first, skip: $skip, orderBy: createdAt_DESC, searchScope: $searchScope, searchTerm: $searchTerm, sortBy: $sortBy) {
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

export default QUESTION_LIST_QUERY;
