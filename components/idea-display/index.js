import { capitalize } from 'lodash';
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Section from './Section';
import { steps } from '../create-idea';
import PageHeader from '../PageHeader';
import Error from './../ErrorMessage.js';
import './index.css';

export const IDEAS_QUERY = gql`
  query IDEAS_QUERY($id: ID!) {
    businessIdea(id: $id) {
      id
      idea
      problem
      solution
      customer
      value
      createdBy {
        id
        name
        display
      }
      createdAt
    }
  }
`;

const usePageStyles = makeStyles(({ palette, spacing }) => ({
  container: {},
  cardsContainer: {
    padding: '0 0 3rem 0.5rem'
  }
}));

export default ({ idea, id }) => {
  const { container, cardsContainer } = usePageStyles();

  return (
    <Query
      query={IDEAS_QUERY}
      variables={{
        id
      }}
    >
      {({ data: { businessIdea }, loading, error }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        return (
          <div className={container}>
            <PageHeader title={`Business Idea`} subTitle={businessIdea.idea} />
            <div className={cardsContainer}>
              {steps.slice(1).map((s, i) => (
                <Section
                  sectionTitle={capitalize(s)}
                  sectionContent={businessIdea[s]}
                  index={i + 1}
                />
              ))}
            </div>
          </div>
        );
      }}
    </Query>
  );
};

// export default withRouter(withStyles(styles)(withApollo(DisplayIdea)));
