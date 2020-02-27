import React from 'react';
import { Mutation } from 'react-apollo';

import CircularProgress from '@material-ui/core/CircularProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Error from './../ErrorMessage.js';
import { Mixpanel } from '../../utils/Mixpanel';
import { BUSINESSIDEAS_LIST_QUERY } from '../my-ideas/index.js';

export default ({ idea, id, mutation, status }) => {
  const [state, setState] = React.useState({
    checkedB: status
  });

  const handleChange = (name, updateBusinessIdea, id) => async event => {
    const switchVote = event.target.checked;
    if (switchVote) {
      if (confirm('Are you sure you want to make your constact info public?')) {
        const res = await updateBusinessIdea({
          variables: {
            id,
            status: true
          },
          refetchQueries: [
            { query: BUSINESSIDEAS_LIST_QUERY, variables: { filter: 'public' } }
          ]
        });

        setState({ ...state, [name]: switchVote });
        Mixpanel.track('Make Idea Public');
      }
    }
    if (!switchVote) {
      if (
        confirm('Are you sure you want to make your constact info private?')
      ) {
        const res = await updateBusinessIdea({
          variables: {
            id,
            status: false
          },
          refetchQueries: [
            { query: BUSINESSIDEAS_LIST_QUERY, variables: { filter: 'public' } }
          ]
        });
        setState({ ...state, [name]: switchVote });

        Mixpanel.track('Make Idea Private');
      }
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
        );
      }}
    </Mutation>
  );
};
