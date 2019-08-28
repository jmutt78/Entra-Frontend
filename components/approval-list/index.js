import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import QuestionList from "../question-list";
import questionListQuery from "../question-list/questionListQuery";
import CircularProgress from '@material-ui/core/CircularProgress';

class AprrovalQuestions extends Component {
  render() {
    const filter = "approval";
    const { page } = this.props;
    return (
      <Query
        query={questionListQuery}
        fetchPolicy="network-only"
        variables={{
          filter,
          skip: page * perPage - perPage,
          first: perPage
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <CircularProgress style={{margin: 20}} />
          if (error) return <p>Error</p>;
          const { questions } = data;

          return (
            <QuestionList
              questions={questions}
              filter={filter}
              page={page}
              name={"approval questions"}
            />
          );
        }}
      </Query>
    );
  }
}

export default AprrovalQuestions;
