import React from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import Error from './../ErrorMessage.js';
import QuestionList from '../question-list';
import TitleBar from '../header/TitleBar';
import tagsListQuery from './tagsListQuery.js';
import { perPage } from '../../config.js';
import { usePageContext } from '../layout';

const styles = ({ layout }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 1200,
    minWidth: '90%',
    height: '100%',
    paddingRight: 10
  }
});

export const TAG_QUERY = gql`
  query TAG_QUERY($id: ID!) {
    tag(id: $id) {
      name
      id
    }
  }
`;

const TagsList = ({ page, id, classes }) => {
  const { searchScope, searchTerm, sortBy } = usePageContext();
  const filter = 'tags';

  const ALL_QUESTIONS_PAGINATION_QUERY = gql`
    query ALL_QUESTIONS_PAGINATION_QUERY(
      $filter: String!
      $searchScope: String
      $searchTerm: String
    ) {
      questionsConnection(
        filter: $filter
        searchScope: $searchScope
        searchTerm: $searchTerm
      ) {
        aggregate {
          count
        }
      }
    }
  `;

  return (
    <div className={classes.container}>
      <TitleBar title={'Tags'} sort={true} search={true} />
      <Query
        query={TAG_QUERY}
        variables={{
          id
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const name = data.tag.name;
          return (
            <Query
              query={tagsListQuery}
              variables={{
                id,
                filter,
                skip: page * perPage - perPage,
                first: perPage,
                searchScope,
                searchTerm,
                sortBy
              }}
            >
              {({ data: { questions }, loading }) => {
                if (loading) return <CircularProgress style={{ margin: 20 }} />;

                return (
                  <QuestionList
                    enablePagination={true}
                    questions={questions}
                    paginationQuery={ALL_QUESTIONS_PAGINATION_QUERY}
                    paginationVariables={{ filter, id }}
                    page={page}
                    name={name}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
    </div>
  );
};

export default withStyles(styles)(withApollo(TagsList));
