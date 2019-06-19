import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { perPage } from "../../config.js";
import QuestionList from "../question-list";

const MYQUESTIONS_QUERY = gql`
  query MYQUESTIONS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    questions(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      description
      createdAt
      answers {
        id
        body
      }
      tags {
        id
        name
      }
      views
      upVotes
      downVotes
    }
  }
`;

class MyQuestions extends Component {
  render() {
    return (
      <Query
        query={MYQUESTIONS_QUERY}
        fetchPolicy="network-only"
        variables={{
          skip: this.props.page * perPage - perPage,
          first: perPage
        }}
      >
        {({ data: { questions }, loading }) => {
          console.log(questions);
          if (loading) return <p>Loading...</p>;
          return <QuestionList questions={questions} />;
        }}
      </Query>
    );
  }
}

export default MyQuestions;
