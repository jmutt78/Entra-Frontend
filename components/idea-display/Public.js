import React from 'react';
import { Mutation } from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Section from './Section';
import { steps } from '../create-idea';
import PageHeader from '../PageHeader';
import Error from './../ErrorMessage.js';
import './index.css';

export default ({ idea, id, mutation, status }) => {
  const [state, setState] = React.useState({
    checkedB: status
  });

  const handleChange = (name, updateBusinessIdea, id) => async event => {
    setState({ ...state, [name]: event.target.checked });
    console.log(event.target.checked);

    if (event.target.checked === true) {
      console.log(id);
      const res = await updateBusinessIdea({
        variables: {
          id,
          status: true
        }
      });
    } else {
      const res = await updateBusinessIdea({
        variables: {
          id,
          status: false
        }
      });
    }
  };

  return (
    <Mutation
      mutation={mutation}
      variables={{
        id
      }}
    >
      {(updateBusinessIdea, { error, loading }) => {
        return (
          <div>
            <FormGroup row>
              <FormControlLabel
                style={{ marginLeft: 10 }}
                control={
                  <Switch
                    checked={state.checkedB}
                    onChange={handleChange('checkedB', updateBusinessIdea, id)}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Public"
              />
            </FormGroup>
          </div>
        );
      }}
    </Mutation>
  );
};
