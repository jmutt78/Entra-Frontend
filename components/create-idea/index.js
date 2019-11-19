import React, { useState } from 'react';
import capitalize from 'lodash/capitalize';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import './index.css';

const steps = ['idea', 'problem', 'solution', 'customer', 'value'];
const initialState = steps.reduce(
  (a, b) => ({
    ...a,
    [b]: ''
  }),
  {}
);

const usePageStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: spacing(1)
  },
  instructions: {
    marginTop: spacing(1),
    marginBottom: spacing(1)
  }
}));

const useStepStyles = makeStyles(({ palette }) => ({
  inputField: {
    width: '100%'
  },
  textFieldContainer: {
    width: '100%'
  }
}));

const StepContent = ({ step, value, setField }) => {
  const { inputField, textFieldContainer } = useStepStyles();
  const fieldprops = {
    className: classNames(inputField),
    label: capitalize(steps[step]),
    name: steps[step],
    onChange: ({ target: { value } }) => setField(value),
    type: 'text',
    value,
    variant: 'filled'
  };

  return (
    <div className={classNames(textFieldContainer)}>
      <TextField {...fieldprops} />
    </div>
  );
};

export default () => {
  const { root, instructions, button } = usePageStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [inputs, setInputs] = useState(initialState);
  const setField = (field, val) =>
    setInputs(inputs => ({ ...inputs, [field]: val }));

  return (
    <div className={classNames(root, 'create-idea-container')}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{capitalize(label)}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={instructions}>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div>
            <Typography className={instructions}>
              <StepContent
                step={activeStep}
                value={inputs[steps[activeStep]]}
                setField={setField.bind(null, steps[activeStep])}
              />
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(a => a - 1)}
                className={button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setActiveStep(a => a + 1)}
                className={button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
