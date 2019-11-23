import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { withApollo } from 'react-apollo';
import Typography from '@material-ui/core/Typography';

import Section from './Section';
import Public from './Public';
import { steps } from '../create-idea';
import PageHeader from '../PageHeader';
import Error from './../ErrorMessage.js';
import './index.css';
import { Mixpanel } from '../../utils/Mixpanel';
import Vote from './Vote';
import { CURRENT_USER_QUERY } from '../auth/User';

// TODO:
// -Add a gate to nonpublic ideas
// -style the voting

export const IDEA_QUERY = gql`
  query IDEA_QUERY($id: ID!) {
    businessIdea(id: $id) {
      id
      idea
      problem
      solution
      customer
      value
      status
      upVotes
      downVotes
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

export const CREATE_BUSINESSIDEA_VOTE_MUTATION = gql`
  mutation CREATE_BUSINESSIDEA_VOTE_MUTATION($ideaId: ID!, $vote: String) {
    createBusinessIdeaVote(ideaId: $ideaId, vote: $vote) {
      id
    }
  }
`;

const usePageStyles = makeStyles(({ palette, spacing }) => ({
  container: {},
  cardsContainer: {
    padding: '0 0 3rem 0.5rem'
  },
  title: {
    color: 'rgba(0, 0, 0, 0.87)',
    display: 'flex',
    alignItems: 'center'
  },
  titleText: {
    fontSize: '33px',
    lineHeight: '2.7rem',
    fontWeight: 600,
    letterSpacing: '-1px'
  }
}));

const DisplayIdea = ({ idea, id, client }) => {
  const { container, cardsContainer, title, titleText } = usePageStyles();

  const upVote = id => {
    client.mutate({
      mutation: CREATE_BUSINESSIDEA_VOTE_MUTATION,
      variables: {
        ideaId: id,
        vote: 'up'
      },
      refetchQueries: [{ query: IDEA_QUERY, variables: { id } }]
    });
    Mixpanel.track('Idea upVote');
  };

  const downVote = id => {
    client.mutate({
      mutation: CREATE_BUSINESSIDEA_VOTE_MUTATION,
      variables: {
        ideaId: id,
        vote: 'down'
      },
      refetchQueries: [{ query: IDEA_QUERY, variables: { id } }]
    });
    Mixpanel.track('Idea downVote');
  };

  return (
    <Query
      query={IDEA_QUERY}
      variables={{
        id
      }}
    >
      {({ data: { businessIdea }, loading, error }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        console.log(businessIdea.status);
        const publicIdea = businessIdea.status;

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
              const voting = hasPermissions || publicIdea;
              console.log(voting);

              return (
                <div className={container}>
                  <div className="titleContainer">
                    <Typography variant="h6" className={title}>
                      <div className="voteContainer">
                        {publicIdea && (
                          <Vote
                            upvoteCb={() => upVote(businessIdea.id)}
                            downvoteCb={() => downVote(businessIdea.id)}
                            upVotes={businessIdea.upVotes}
                            downVotes={businessIdea.downVotes}
                          />
                        )}
                      </div>
                      <div className={titleText}>{businessIdea.idea}</div>
                    </Typography>
                  </div>
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
                        upVotes={businessIdea.upVotes}
                        downVotes={businessIdea.downVotes}
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

export default withApollo(DisplayIdea);
