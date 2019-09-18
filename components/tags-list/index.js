import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withApollo } from 'react-apollo';
import { perPage } from '../../config.js';
import QuestionList from '../question-list';
import tagsListQuery from './tagsListQuery.js';
import { useQuery } from '@apollo/react-hooks';
import Error from './../ErrorMessage.js';
import CircularProgress from '@material-ui/core/CircularProgress';

export const TAGS_QUESTIONS_PAGINATION_QUERY = gql`
  query TAGS_QUESTIONS_PAGINATION_QUERY($id: ID!, $filter: String!) {
    questionsConnection(where: { tags_some: { id: $id } }, filter: $filter) {
      aggregate {
        count
      }
    }
  }
`;

export const TAG_QUERY = gql`
  query TAG_QUERY($id: ID!) {
    tag(id: $id) {
      name
      id
    }
  }
`;

class TagsList extends Component {
  render() {
    const filter = 'tags';
    const { page, id } = this.props;

    return (
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
                id: this.props.id,
                filter,
                skip: page * perPage - perPage,
                first: perPage
              }}
            >
              {({ data: { questions }, loading }) => {
                if (loading) return <CircularProgress style={{ margin: 20 }} />;

                return (
                  <QuestionList
                    enablePagination={true}
                    questions={questions}
                    paginationQuery={TAGS_QUESTIONS_PAGINATION_QUERY}
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
    );
  }
}

export default withApollo(TagsList);
