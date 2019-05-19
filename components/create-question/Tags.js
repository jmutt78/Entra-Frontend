import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const TAGS_QUERY = gql`
  query {
    tags {
      id
      name
    }
  }
`;

const Tags = props => (
  <Query {...props} query={TAGS_QUERY}>
    {({ loading, data }) => {
      if (loading) {
        return null;
      }
      return (
        <ul>
          {data.tags.map(tag => (
            <li>{tag.name}</li>
          ))}
        </ul>
      );
    }}
  </Query>
);

export default Tags;
export { TAGS_QUERY };
