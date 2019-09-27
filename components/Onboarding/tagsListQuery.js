import gql from 'graphql-tag';
import { perPage } from '../../config.js';

const TAGS_QUERY = gql`
  query TAGS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    tags(first: $first, skip: $skip, orderBy: name_ASC) {
      name
      id
  }
}
`;

export default TAGS_QUERY;
