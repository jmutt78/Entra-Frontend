import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withApollo } from "react-apollo";
import { perPage } from "../../config.js";
import QuestionList from "../question-list";
import userListQuery from "./userListQuery.js";
import { USER_QUERY } from "../user-display";

class UserList extends Component {
  render() {
    const filter = "user";
    const { page } = this.props;

    return (
      <Query
        query={USER_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          const name = data.user.name;

          return (
            <Query
              query={userListQuery}
              variables={{
                id: this.props.id,
                filter,
                skip: page * perPage - perPage,
                first: perPage
              }}
            >
              {({ data: { questions }, loading }) => {
                if (loading) return <p>Loading...</p>;
                console.log(questions);

                return (
                  <QuestionList
                    questions={questions}
                    filter={filter}
                    page={page}
                    name={name}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default withApollo(UserList);
