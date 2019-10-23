import gql from 'graphql-tag';

const TAGS_QUERY = gql`
  query {
    tags(first: 10, orderBy: name_ASC) {
      id
      name
    }
  }
`;

export { TAGS_QUERY };
