import React, { useState } from 'react';
import { capitalize } from 'lodash';
import classNames from 'classnames';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Router from 'next/router';

import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import StepContent from './StepContent';
import Error from './../ErrorMessage.js';
import PageHeader from '../PageHeader';
import './index.css';

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

const usePageStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    width: '100%',
    maxWidth: 800
  },
  button: {
    marginRight: spacing(1)
  },
  instructions: {
    marginTop: spacing(1),
    marginBottom: spacing(1)
  }
}));

export default () => {
  const { root, instructions, button } = usePageStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [inputs, setInputs] = useState(initialState);
  const setField = (field, val) =>
    setInputs(inputs => ({ ...inputs, [field]: val }));

  return (
    <Mutation mutation={CREATE_IDEA_MUTATION} variables={{ ...inputs }}>
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
          <div className={classNames(root, 'create-idea-container')}>
            <PageHeader title="Create a business idea" />
            <Error error={error} />
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{capitalize(label)}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <div>
              <Typography className={instructions}>
                <div className={classNames('ideaCreate-textFieldContainer')}>
                  <StepContent
                    step={activeStep}
                    value={inputs[steps[activeStep]]}
                    setField={setField.bind(null, steps[activeStep])}
                  />
                </div>
              </Typography>
              <div className={classNames('create-idea-buttons')}>
                <Button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(a => a - 1)}
                  className={button}
                  xs
                >
                  Back
                </Button>
                <Button
                  className={button}
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
                </Button>
              </div>
            </div>
          </div>
        );
      }}
    </Mutation>
  );
};
