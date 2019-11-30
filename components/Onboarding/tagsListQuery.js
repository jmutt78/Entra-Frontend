import gql from 'graphql-tag';

const TAGS_QUERY = gql`
  query TAGS_QUERY {
    tags(orderBy: name_ASC) {
      name
      id
    }
  }
`;

export default TAGS_QUERY;
