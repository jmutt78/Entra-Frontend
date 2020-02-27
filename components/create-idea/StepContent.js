import React from 'react';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import steps from '.';

const stepNames = [
  `Give your idea a descriptive name`,
  `What problem are you solving?`,
  `How does your idea solve the problem?`,
  `Who are your customers?`,
  `What's the value you're creating?`
];

const StyledTextField = styled(TextField)`
  &&& {
    width: 100%;
  }
`;

export default ({ step, value, setField }) => {
  const rows = (step => {
    switch (step) {
      case 0:
        return 1;
      default:
        return 5;
    }
  })(step);

  const fieldprops = {
    label: stepNames[step],
    multiline: true,
    name: steps[step],
    onChange: ({ target: { value } }) => setField(value),
    rows,
    type: 'text',
    value,
    variant: 'filled'
  };

  return <StyledTextField {...fieldprops} />;
};
