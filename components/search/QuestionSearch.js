import React from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import deburr from "lodash/deburr";
import debounce from "lodash.debounce";
import TextField from "@material-ui/core/TextField";

import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

const SEARCH_QUESTIONS_QUERY = gql`
  query SEARCH_QUESTIONS_QUERY($searchTerm: String!) {
    questions(where: { title_contains: $searchTerm }) {
      id
      title
    }
  }
`;

class QuestionSearch extends React.Component {
  state = {
    questions: [],
    loading: false
  };
  onChange = debounce(async (e, client) => {
    console.log("Searching...");
    // turn loading on
    this.setState({ loading: true });

    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_QUESTIONS_QUERY,
      variables: { searchTerm: e.target.value }
    });

    this.setState({
      questions: res.data.questions,
      loading: false
    });
  }, 350);
  render() {
    return (
      <div>
        <ApolloConsumer>
          {client => (
            <TextField
              type="search"
              onChange={e => {
                e.persist();
                this.onChange(e, client);
              }}
            />
          )}
        </ApolloConsumer>
      </div>
    );
  }
}

export default QuestionSearch;
