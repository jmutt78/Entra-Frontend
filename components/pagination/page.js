import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";
import Head from "next/head";

import { perPage } from "../../config.js";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";

import Error from "../ErrorMessage";

import { CURRENT_USER_QUERY } from "../auth/User";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    questionsConnection(orderBy: createdAt_ASC) {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading, error }) => {
      if (error) return <Error error={error} />;
      if (loading) return <p>Loading...</p>;
      console.log(data.me.id);
      return (
        <Query query={PAGINATION_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <Error error={error} />;

            const count = data.questionsConnection.aggregate.count;
            const pages = Math.ceil(count / perPage);
            const page = props.page;
            console.log(count);
            return (
              <div>
                <Head>
                  <title>
                    Entra — Page {page} of {pages}
                  </title>
                </Head>
                <div align="right">
                  <Typography style={{ display: "inline-flex" }}>
                    Page {page} - {pages}
                  </Typography>
                  <Link
                    prefetch
                    href={{
                      pathname: "myquestions",
                      query: { page: page - 1 }
                    }}
                  >
                    <IconButton disabled={page <= 1}>
                      <a />

                      <KeyboardArrowLeft />
                    </IconButton>
                  </Link>
                  <Link
                    prefetch
                    href={{
                      pathname: "myquestions",
                      query: { page: page + 1 }
                    }}
                  >
                    <IconButton disabled={page >= pages}>
                      <KeyboardArrowRight />
                    </IconButton>
                  </Link>
                </div>
              </div>
            );
          }}
        </Query>
      );
    }}
  </Query>
);

export default Pagination;
export { PAGINATION_QUERY };
