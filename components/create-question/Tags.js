import gql from "graphql-tag";

const TAGS_QUERY = gql`
  query {
    tags {
      id
      name
    }
  }
`;

export { TAGS_QUERY };
