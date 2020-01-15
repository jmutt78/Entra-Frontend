import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import CircularProgress from '@material-ui/core/CircularProgress';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Error from './../ErrorMessage.js';
import './index.css';
import { Mixpanel } from '../../utils/Mixpanel';

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: ID!, $shareEmail: Boolean, $shareSocial: Boolean) {
    updateUser(id: $id, shareEmail: $shareEmail, shareSocial: $shareSocial) {
      id
    }
  }
`;

export default ({ me, query }) => {
  const [state, setState] = React.useState({
    social: me.shareSocial,
    email: me.shareEmail
  });

  const handleSocialChange = (name, updateUser, id) => async event => {
    const switchValue = event.target.checked;

    if (switchValue) {
      if (confirm('Are you sure you want to make your social links public?')) {
        const res = await updateUser({
          variables: {
            id,
            shareSocial: true
          }
        });

        setState({ ...state, [name]: switchValue });
        Mixpanel.track('Make Social Public');
      }
    }
    if (!switchValue) {
      if (confirm('Are you sure you want to make your social links public?')) {
        const res = await updateUser({
          variables: {
            id,
            shareSocial: false
          }
        });
        setState({ ...state, [name]: switchValue });

        Mixpanel.track('Make Social Public');
      }
    }
  };

  const handleEmailChange = (name, updateUser, id) => async event => {
    const switchEmail = event.target.checked;
    if (switchEmail) {
      if (confirm('Are you sure you want to make your constact info public?')) {
        const res = await updateUser({
          variables: {
            id,
            shareEmail: true
          }
        });

        setState({ ...state, [name]: switchEmail });
        Mixpanel.track('Make Contact Public');
      }
    }
    if (!switchEmail) {
      if (
        confirm('Are you sure you want to make your constact info private?')
      ) {
        const res = await updateUser({
          variables: {
            id,
            shareEmail: false
          }
        });
        setState({ ...state, [name]: switchEmail });

        Mixpanel.track('Make Contact Public');
      }
    }
  };

  const level1 = me.mastery.level1;
  const level2 = me.mastery.level2;

  return (
    <Mutation
      mutation={UPDATE_USER_MUTATION}
      variables={{
        id: me.id
      }}
    >
      {(updateUser, { error, loading }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        const id = me.id;
        return (
          <div>
            <FormGroup row>
              {level1 ? (
                <FormControlLabel
                  style={{ marginLeft: 10 }}
                  control={
                    <Switch
                      checked={state.social}
                      onChange={handleSocialChange('social', updateUser, id)}
                      value="social"
                      color="primary"
                    />
                  }
                  label="Social Links Public?"
                />
              ) : null}
              {level2 ? (
                <FormControlLabel
                  style={{ marginLeft: 10 }}
                  control={
                    <Switch
                      checked={state.email}
                      onChange={handleEmailChange('email', updateUser, id)}
                      value="email"
                      color="primary"
                    />
                  }
                  label="Contact Info Public?"
                />
              ) : null}
            </FormGroup>
          </div>
        );
      }}
    </Mutation>
  );
};
