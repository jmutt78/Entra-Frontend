import React, { useState } from 'react';
import capitalize from 'lodash/capitalize';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const usePageStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    width: '90%'
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
  inputField: {}
}));

const useInput = (
  name = '',
  className = '',
  required = true,
  variant = 'filled'
) => {
  const [value, setValue] = useState('');
  const onChange = ({ target: { value: _value } }) => setValue(_value);

  return {
    className,
    label: capitalize(name),
    name,
    onChange,
    required,
    type: 'text',
    value,
    variant: 'filled'
  };
};

const StepContent = ({ name }) => {
  const { inputField } = useStepStyles();

  return (
    <FormControl>
      <label>
        <TextField {...useInput(name, classNames(inputField))} />
      </label>
    </FormControl>
  );
};

const StepsContent = ({ activeStep }) => {
  switch (activeStep) {
    case 0:
      return <StepContent name="idea" />;
    case 1:
      return <StepContent name="problem" />;
    case 2:
      return <StepContent name="solution" />;
    case 3:
      return <StepContent name="customer" />;
    case 4:
      return <StepContent name="value" />;
    default:
      return 'Unknown step';
  }
};

export default () => {
  const { root, instructions, button } = usePageStyles();
  const [activeStep, setActiveStep] = useState(1);
  const steps = ['idea', 'problem', 'solution', 'customer', 'value'];

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={root}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={instructions}>
              <StepsContent activeStep={activeStep} />
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
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
