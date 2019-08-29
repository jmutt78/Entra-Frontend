import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import QuestionList from "../question-list";
import questionListQuery from "../question-list/questionListQuery";
import Error from "./../ErrorMessage.js";
import CircularProgress from "@material-ui/core/CircularProgress";

class Questions extends Component {
  render() {
    const filter = "all";
    const { page } = this.props;
    return (
      <Query
        query={questionListQuery}
        variables={{
          filter,
          skip: page * perPage - perPage,
          first: perPage
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const { questions } = data;
          return (
            <QuestionList
              questions={questions}
              filter={filter}
              page={page}
              name={"all questions"}
              enablePagination={true}
            />
          );
        }}
      </Query>
    );
  }
}

export default Questions;
