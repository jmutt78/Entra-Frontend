import React, { Component } from "react";
import { Query } from "react-apollo";
import NoUserAnswers from "./NoUserAnswers";
import UserAnswers from "./UserAnswers";
import { CURRENT_USER_QUERY } from "../auth/User";

class Answers extends Component {
  render() {
    const question = this.props.question;

    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          const user = data.me;

          if (!user) {
            return (
              <div>
                <NoUserAnswers question={question} />
              </div>
            );
          }
          return (
            <div>
              <UserAnswers user={user} question={question} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Answers;
