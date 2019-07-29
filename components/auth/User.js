import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      display
      name
      permissions
      createdAt
      updatedAt
      location
      about
      industry
      image
      myBookMarks {
        id
        questions {
          id
        }
      }
      myQuestions {
        id
        questionVote {
          id
          vote
        }
      }
      badges {
        autobiographer
        critic
        patron
        reviewer
        analyst
        commentor
        frequentFlyer
      }
      myAnswers {
        id
        selected
        answerVote {
          id
          vote
        }
        answeredTo {
          id
        }
      }
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };
