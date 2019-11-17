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

const steps = ['idea', 'problem', 'solution', 'customer', 'value'];

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

export default () => {
  const { root, instructions, button } = usePageStyles();
  const { inputField } = useStepStyles();
  const [activeStep, setActiveStep] = useState(0);

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
          </div>
        ) : (
          <div>
            <Typography className={instructions}>
              {steps.map((s, i) => (
                <TextField
                  {...useInput(s, classNames(inputField))}
                  style={{ display: activeStep === i ? 'block' : 'none' }}
                />
              ))}
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
