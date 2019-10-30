import gql from 'graphql-tag';
import { perPage } from '../../config.js';

const TAGS_QUERY = gql`
  query TAGS_QUERY {
    tags(orderBy: name_ASC) {
      name
      id
    }
  }
`;

export default TAGS_QUERY;
