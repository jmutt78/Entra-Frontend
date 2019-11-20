import React, { useState } from 'react';
import { capitalize } from 'lodash';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import './index.css';
import Error from './../ErrorMessage.js';
import StepContent from '../create-idea/StepContent';

export const UPDATE_IDEA_MUTATION = gql`
  mutation UPDATE_IDEA_MUTATION(
    $id: ID!
    $idea: String
    $problem: String
    $solution: String
    $customer: String
    $value: String
  ) {
    updateBusinessIdea(
      id: $id
      idea: $idea
      problem: $problem
      solution: $solution
      customer: $customer
      value: $value
    ) {
      id
      idea
      problem
      solution
      customer
      value
    }
  }
`;

const useSectionStyles = makeStyles(({ palette }) => ({
  cardContainer: {
    padding: '1rem 0'
  },
  card: {
    minWidth: 275,
    maxWidth: 800
  },
  title: {
    fontWeight: 500
  },
  content: {
    fontSize: 17
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '1rem'
  },
  stepContentContainer: {
    padding: '1.5rem 0 0 0'
  }
}));

const updateField = async (mutate, id, newState) => {
  await mutate({
    variables: {
      id,
      ...newState
    }
  });
};

export default ({ step, sectionContent, index, id }) => {
  const {
    cardContainer,
    card,
    title,
    content,
    buttonContainer,
    stepContentContainer
  } = useSectionStyles();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(sectionContent);

  return (
    <div className={cardContainer}>
      <Card className={card}>
        <Mutation
          mutation={UPDATE_IDEA_MUTATION}
          variables={{
            id,
            [step]: value
          }}
        >
          {(updateField, { error, loading }) => {
            return (
              <>
                <CardContent>
                  <Error error={error} />
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={title}
                  >
                    {capitalize(step)}
                  </Typography>

                  {editing ? (
                    <div className={stepContentContainer}>
                      <StepContent
                        step={index}
                        value={value}
                        setField={setValue}
                      />
                    </div>
                  ) : (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className={content}
                    >
                      {sectionContent}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <div className={buttonContainer}>
                    <Button
                      size="small"
                      disabled={loading}
                      onClick={async () => {
                        if (editing) {
                          await updateField();
                        }
                        setEditing(e => !e);
                      }}
                      color={editing ? 'primary' : undefined}
                    >
                      {editing ? 'Save' : 'Edit'}
                    </Button>
                  </div>
                </CardActions>
              </>
            );
          }}
        </Mutation>
      </Card>
    </div>
  );
};
