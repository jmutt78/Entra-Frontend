import React, { Component } from "react";
import { Query } from "react-apollo";

import { CURRENT_USER_QUERY } from "../auth/User";
import UserQuestion from "./UserQuestion";
import NoQuestion from "./NoUserQuestion";

class MainQuestion extends Component {
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
                <NoQuestion question={question} />
              </div>
            );
          }
          return (
            <div>
              <UserQuestion question={question} user={user} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default MainQuestion;
