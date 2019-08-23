import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import AnswerList from "./index";
import answersListQuery from "./answerListQuery";
import Error from "./../ErrorMessage.js";

class AprrovalAnswers extends Component {
  render() {
    const { page } = this.props;
    const filter = "approval";
    return (
      <Query
        query={answersListQuery}
        variables={{
          filter,
          skip: page * perPage - perPage,
          first: perPage
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          const { answers } = data;
          return (
            <AnswerList
              answers={answers}
              filter={filter}
              page={page}
              enablePagination={true}
            />
          );
        }}
      </Query>
    );
  }
}

export default AprrovalAnswers;
