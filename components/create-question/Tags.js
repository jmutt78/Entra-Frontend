import gql from 'graphql-tag';

const TAGS_QUERY = gql`
  query {
    tags(orderBy: name_ASC) {
      id
      name
    }
  }
`;

export { TAGS_QUERY };
