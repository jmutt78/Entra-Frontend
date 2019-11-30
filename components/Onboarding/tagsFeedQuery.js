import gql from 'graphql-tag';
import { perPage } from '../../config.js';

const TAG_FEED_QUERY = gql`
  query TAG_FEED_QUERY($id: ID!, $filter: String!, $skip: Int = 0, $first: Int = ${perPage}) {
    questions(where: {tags_some: {id_in: $id}}, filter: $filter, first: $first, skip: $skip, orderBy: createdAt_DESC) {
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
    }
  }
`;

export default TAG_FEED_QUERY;
