import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Section from './Section';
import Public from './Public';
import { steps } from '../create-idea';
import PageHeader from '../PageHeader';
import Error from './../ErrorMessage.js';
import './index.css';
import { CURRENT_USER_QUERY } from '../auth/User';

export const IDEAS_QUERY = gql`
  query IDEAS_QUERY($id: ID!) {
    businessIdea(id: $id) {
      id
      idea
      problem
      solution
      customer
      value
      status
      createdBy {
        id
        name
        display
      }
      createdAt
    }
  }
`;

export const UPDATE_IDEA_MUTATION = gql`
  mutation UPDATE_IDEA_MUTATION(
    $id: ID!
    $idea: String
    $problem: String
    $solution: String
    $customer: String
    $value: String
    $status: Boolean
  ) {
    updateBusinessIdea(
      id: $id
      idea: $idea
      problem: $problem
      solution: $solution
      customer: $customer
      value: $value
      status: $status
    ) {
      id
      idea
      problem
      solution
      customer
      value
      status
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
          <Query query={CURRENT_USER_QUERY}>
            {({ data: { me }, loading, error }) => {
              if (loading) return <CircularProgress style={{ margin: 20 }} />;
              if (error) return <Error error={error} />;

              const ownsIdea = businessIdea.createdBy.id === me.id;

              const hasPermissions = ownsIdea;
              me.permissions.some(permission =>
                ['ADMIN', 'MODERATOR'].includes(permission)
              );

              return (
                <div className={container}>
                  <PageHeader
                    title={`Business Idea`}
                    subTitle={businessIdea.idea}
                  />
                  {hasPermissions && (
                    <Public
                      id={id}
                      mutation={UPDATE_IDEA_MUTATION}
                      status={businessIdea.status}
                    />
                  )}

                  <div className={cardsContainer}>
                    {steps.slice(1).map((s, i) => (
                      <Section
                        edit={hasPermissions}
                        step={s}
                        sectionContent={businessIdea[s]}
                        index={i + 1}
                        id={id}
                        mutation={UPDATE_IDEA_MUTATION}
                      />
                    ))}
                  </div>
                </div>
              );
            }}
          </Query>
        );
      }}
    </Query>
  );
};
