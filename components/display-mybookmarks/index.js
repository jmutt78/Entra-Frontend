import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import QuestionList from "../question-list";
import questionListQuery from "../question-list/questionListQuery";
import CircularProgress from "@material-ui/core/CircularProgress";

class MyBookMark extends Component {
  render() {
    const filter = "My BookMarked";
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
          if (error) return <p>Error</p>;
          const { questions } = data;

          return (
            <QuestionList
              enablePagination={true}
              questions={questions}
              filter={filter}
              page={page}
              name={"my bookmarks"}
            />
          );
        }}
      </Query>
    );
  }
}

export default MyBookMark;
