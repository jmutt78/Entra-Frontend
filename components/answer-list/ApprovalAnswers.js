import React, { Component } from "react";
import { Query } from "react-apollo";
import { perPage } from "../../config.js";
import AnswerList from "./index";
import answersListQuery from "./answerListQuery";
import Error from "./../ErrorMessage.js";
import CircularProgress from '@material-ui/core/CircularProgress';

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
          if (loading) return <CircularProgress style={{margin: 20}} />
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
