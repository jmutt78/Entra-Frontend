import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Mixpanel } from '../../utils/Mixpanel';

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
      instagram
      twitter
      linkedIn
      facebook
      website
      shareEmail
      shareSocial
      myBookMarks {
        id
        questions {
          id
        }
      }
      myIntro {
        id
      }
      myComments {
        id
        commentTo {
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
      tags {
        id
        name
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

const CURRENT_USER_QUERY_PROFILE = gql`
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
      points
      instagram
      twitter
      linkedIn
      facebook
      website
      shareEmail
      shareSocial
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
      mastery {
        level1
        level2
        level3
        level4
      }
      myIntro {
        id
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
export { CURRENT_USER_QUERY, CURRENT_USER_QUERY_PROFILE };
