import React, { useState } from 'react';
import { capitalize } from 'lodash';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './index.css';
import Error from './../ErrorMessage.js';
import StepContent from '../create-idea/StepContent';
import { Mixpanel } from '../../utils/Mixpanel';

const updateField = async (mutate, id, newState) => {
  await mutate({
    variables: {
      id,
      ...newState
    }
  });
};

const StepContentContainer = styled.div`
  padding: 1.5rem 0 0 0;
`;

const CardContaier = styled.div`
  padding: 1rem 0;
`;

const StyledCard = styled(Card)`
  &&& {
    min-width: 275px;
    max-width: 800px;
  }
`;

const StyledTitle = styled(Typography)`
  &&& {
    font-weight: 500;
  }
`;

const StyledContent = styled(Typography)`
  &&& {
    font-size: 17px;
    white-space: pre-wrap;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 1rem;
`;

export default ({
  step,
  sectionContent,
  index,
  id,
  mutation,
  edit,
  upVotes,
  downVotes,
  client
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(sectionContent);

  return (
    <CardContaier>
      <StyledCard>
        <Mutation
          mutation={mutation}
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
                  <StyledTitle gutterBottom variant="h5" component="h2">
                    {capitalize(step)}
                  </StyledTitle>

                  {editing ? (
                    <StepContentContainer>
                      <StepContent
                        step={index}
                        value={value}
                        setField={setValue}
                      />
                    </StepContentContainer>
                  ) : (
                    <StyledContent
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {sectionContent}
                    </StyledContent>
                  )}
                </CardContent>
                <CardActions>
                  {edit && (
                    <ButtonContainer>
                      {editing && (
                        <Button
                          style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                          size="small"
                          onClick={() => {
                            setEditing(e => !e);
                            Mixpanel.track('Edit Idea');
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        size="small"
                        disabled={loading}
                        onClick={async () => {
                          if (editing) {
                            // mutate only if changes were made
                            if (sectionContent !== value) {
                              await updateField();
                            }
                          }
                          setEditing(e => !e);
                        }}
                        color={'primary'}
                      >
                        {editing ? 'Save' : 'Edit'}
                      </Button>
                    </ButtonContainer>
                  )}
                </CardActions>
              </>
            );
          }}
        </Mutation>
      </StyledCard>
    </CardContaier>
  );
};
