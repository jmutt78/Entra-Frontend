import gql from "graphql-tag";
import { perPage } from "../../config.js";

const ANSWER_LIST_QUERY = gql`
  query MYANSWER_QUERY($filter: String!, $skip: Int = 0, $first: Int = ${perPage}) {
    answers(filter: $filter, first: $first, skip: $skip, orderBy: createdAt_DESC) {
      answeredTo {
        id
      }
      id
      body
      createdAt
      approval
      selected
      upVotes
      downVotes
      answeredBy: answeredBy {
        id
        name
        display
        image
        createdAt
      }
    }
  }
`;

export default ANSWER_LIST_QUERY;
