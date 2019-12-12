import React from 'react';
import { Mutation } from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Error from './../ErrorMessage.js';
import './index.css';
import { Mixpanel } from '../../utils/Mixpanel';

export default ({ idea, id, mutation, status }) => {
  const [state, setState] = React.useState({
    checkedB: status
  });

  const handleChange = (name, updateBusinessIdea, id) => async event => {
    setState({ ...state, [name]: event.target.checked });

    if (event.target.checked === true) {
      const res = await updateBusinessIdea({
        variables: {
          id,
          status: true
        }
      });
      Mixpanel.track('Make Idea Public');
    } else {
      const res = await updateBusinessIdea({
        variables: {
          id,
          status: false
        }
      });
      Mixpanel.track('Make Idea Private');
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
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
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
