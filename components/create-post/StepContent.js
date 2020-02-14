import React from 'react';
import classNames from 'classnames';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import steps from '.';

const stepNames = [
  `Introduce yourself. What are you working on?`,
  `What are your challenges?`,
  `How can the community help?`
];

const useStepStyles = makeStyles(({ palette }) => ({
  inputField: {
    width: '100%'
  }
}));

export default ({ step, value, setField }) => {
  const { inputField } = useStepStyles();
  const rows = (step => {
    switch (step) {
      case 0:
        return 3;
      default:
        return 3;
    }
  })(step);

  const fieldprops = {
    className: classNames(inputField),
    label: stepNames[step],
    multiline: true,
    name: steps[step],
    onChange: ({ target: { value } }) => setField(value),
    rows,
    type: 'text',
    value,
    variant: 'filled'
  };

  return <TextField {...fieldprops} />;
};
