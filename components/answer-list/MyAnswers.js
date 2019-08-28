import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import AnswerList from "./index";
import answersListQuery from "./answerListQuery.js";
import CircularProgress from '@material-ui/core/CircularProgress';

class MyAnswers extends Component {
  render() {
    const { page } = this.props;
    const filter = "my";
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
          if (loading) return <CircularProgress style={{margin: 20}} />
          if (error) return <p>Error</p>;
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

export default MyAnswers;
