import React from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Router from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";

const LINKEDIN_LOGIN_MUTATION = gql`
  mutation LINKEDIN_LOGIN_MUTATION($code: String!) {
    linkedinLogin(code: $code) {
      id
      email
      name
    }
  }
`;

class LinkedinRedirect extends React.Component {
  componentDidMount() {
    this.props.client
      .mutate({
        mutation: LINKEDIN_LOGIN_MUTATION,
        variables: {
          code: this.props.query.code
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }]
      })
      .then(() => {
        Router.push("/");
      });
  }
  render() {
    return <CircularProgress style={{ margin: 20 }} />;
  }
}

export default withApollo(LinkedinRedirect);
