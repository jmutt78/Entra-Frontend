import React, { useState } from 'react';
import styled from 'styled-components';
import { capitalize } from 'lodash';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Router from 'next/router';

import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';

import { BUSINESSIDEAS_LIST_QUERY } from '../my-ideas/index.js';
import StepContent from './StepContent';
import Error from './../ErrorMessage.js';
import PageHeader from '../PageHeader';

export const steps = ['idea', 'problem', 'solution', 'customer', 'value'];
const initialState = steps.reduce(
  (a, b) => ({
    ...a,
    [b]: ''
  }),
  {}
);

export const CREATE_IDEA_MUTATION = gql`
  mutation createBusinessIdea(
    $idea: String!
    $problem: String
    $solution: String
    $customer: String
    $value: String
  ) {
    createBusinessIdea(
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

const RootCreateIdeaContainer = styled.div`
  width: 100%;
  max-width: 800px;

  .MuiPaper-root {
    background: #fafafa !important;
  }

  .MuiFilledInput-inputMultiline {
    line-height: 1.4rem !important;
  }

  @media (max-width: 500px) {
    .MuiStepper-root {
      padding: 24px 4px !important;
    }
  }
`;

const NoteContainer = styled.div`
  margin-bottom: 2rem;
  background: ${props => props.theme.palette.secondary.main};
  padding: 1rem 0.5rem;
  border-radius: 2px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  padding: 0 1rem;
  max-width: 800px;
`;

const Instructions = styled(Typography)`
  &&& {
    margin-top: ${props => props.theme.spacing(1)}px;
    margin-bottom: ${props => props.theme.spacing(1)}px;
  }
`;

const IdeaCreateTextFieldContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 2rem 4rem;

  @media (max-width: 500px) {
    padding: 2rem 1rem;
  }
`;

const CreateIdeaButtons = styled.div`
  padding: 2rem 4rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 500px) {
    padding: 2rem 1rem;
  }
`;

const StyledButton = styled(Button)`
  &&& {
    margin-right: ${props => props.theme.spacing(1)}px;
  }
`;

export default () => {
  const [activeStep, setActiveStep] = useState(0);
  const [inputs, setInputs] = useState(initialState);
  const setField = (field, val) =>
    setInputs(inputs => ({ ...inputs, [field]: val }));

  return (
    <Mutation
      mutation={CREATE_IDEA_MUTATION}
      variables={{ ...inputs }}
      refetchQueries={[
        {
          query: BUSINESSIDEAS_LIST_QUERY,
          variables: { filter: 'my' }
        }
      ]}
    >
      {(createIdea, { error, loading }) => {
        const submit = async () => {
          const {
            data: {
              createBusinessIdea: { id }
            }
          } = await createIdea();
          Router.push({
            pathname: '/idea/idea',
            query: { id }
          });
        };
        return (
          <RootCreateIdeaContainer>
            <PageHeader title="Create a business idea" />
            <Error error={error} />
            <NoteContainer>
              <Paragraph>
                Great business ideas are all around you. Just open yourself to
                the possibilities, and you're bound to find a winner.
              </Paragraph>
              <Paragraph>
                Document all of your business ideas in one place. Each step
                helps you break your ideas into the essential charactersitics
                for success.
              </Paragraph>
            </NoteContainer>
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{capitalize(label)}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Instructions>
              <IdeaCreateTextFieldContainer>
                <StepContent
                  step={activeStep}
                  value={inputs[steps[activeStep]]}
                  setField={setField.bind(null, steps[activeStep])}
                />
              </IdeaCreateTextFieldContainer>
            </Instructions>
            <CreateIdeaButtons>
              <StyledButton
                disabled={activeStep === 0}
                onClick={() => setActiveStep(a => a - 1)}
                xs
              >
                Back
              </StyledButton>
              <StyledButton
                color="primary"
                disabled={loading}
                onClick={
                  activeStep === steps.length - 1
                    ? submit
                    : () => setActiveStep(a => a + 1)
                }
                variant="contained"
              >
                {activeStep === steps.length - 1 ? 'Save Idea' : 'Next'}
              </StyledButton>
            </CreateIdeaButtons>
          </RootCreateIdeaContainer>
        );
      }}
    </Mutation>
  );
};
