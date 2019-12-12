import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { withApollo } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import StepContent from '../create-idea/StepContent';
import Section from './Section';
import Public from './Public';
import { steps } from '../create-idea';
import Error from './../ErrorMessage.js';
import './index.css';
import { Mixpanel } from '../../utils/Mixpanel';
import Vote from './Vote';
import { CURRENT_USER_QUERY } from '../auth/User';

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
  grid: {
    margin: spacing(1)
  },
  paper: {
    backgroundColor: '#F2F4EF',
    padding: 30
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
  },
  root: {
    margin: spacing(1),
    marginTop: 40
  }
}));

const DisplayIdea = ({ idea, id, client }) => {
  const [editing, setEditing] = useState(false);
  const [_idea, setIdea] = useState('');

  const {
    container,
    cardsContainer,
    title,
    titleText,
    paper,
    grid,
    root
  } = usePageStyles();

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

        const publicIdea = businessIdea.status;

        if (!_idea) {
          setIdea(businessIdea.idea);
        }

        return (
          <Query query={CURRENT_USER_QUERY}>
            {({ data: { me }, loading, error }) => {
              if (loading) return <CircularProgress style={{ margin: 20 }} />;
              if (error) return <Error error={error} />;

              const ownsIdea = businessIdea.createdBy.id === me.id;

              const hasPermissions =
                ownsIdea ||
                me.permissions.some(permission =>
                  ['ADMIN', 'MODERATOR'].includes(permission)
                );

              const approved = hasPermissions || publicIdea;

              return (
                <div className={container}>
                  {approved && (
                    <diV style={{ width: '100%' }}>
                      <div
                        className="idea-titleContainer"
                        style={{ width: '100%' }}
                      >
                        <Typography
                          variant="h6"
                          className={title}
                          style={{ width: '100%' }}
                        >
                          <div className="voteContainer">
                            <Vote
                              upvoteCb={() => upVote(businessIdea.id)}
                              downvoteCb={() => downVote(businessIdea.id)}
                              upVotes={businessIdea.upVotes}
                              downVotes={businessIdea.downVotes}
                            />
                          </div>

                          {editing ? (
                            <div style={{ width: '100%' }}>
                              <StepContent
                                step={0}
                                value={_idea}
                                setField={setIdea}
                              />
                            </div>
                          ) : (
                            <div className={titleText}>{_idea}</div>
                          )}
                        </Typography>

                        <Mutation
                          mutation={UPDATE_IDEA_MUTATION}
                          variables={{
                            id,
                            idea: _idea
                          }}
                        >
                          {(updateTitle, { error, loading }) => {
                            return (
                              <div className={'hoverButtonContainer'}>
                                {hasPermissions && (
                                  <Button
                                    size="small"
                                    disabled={loading}
                                    onClick={async () => {
                                      if (editing) {
                                        // mutate only if changes were made
                                        if (businessIdea.idea !== _idea) {
                                          await updateTitle();
                                        }
                                      }
                                      setEditing(e => !e);
                                    }}
                                    color={'primary'}
                                  >
                                    {editing ? 'Save' : 'Edit'}
                                  </Button>
                                )}
                              </div>
                            );
                          }}
                        </Mutation>
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
                    </diV>
                  )}

                  {!approved && (
                    <div>
                      {' '}
                      <Grid container className={root} spacing={3}>
                        <Grid item xs />
                        <Grid item xs={7} className={grid}>
                          <Paper className={paper}>
                            <div>
                              <Typography>
                                Sorry, this idea is no longer public
                              </Typography>
                            </div>
                          </Paper>
                        </Grid>
                        <Grid item xs />
                      </Grid>
                    </div>
                  )}
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
