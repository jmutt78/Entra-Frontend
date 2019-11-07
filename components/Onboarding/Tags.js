import Error from './../ErrorMessage.js';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import { CURRENT_USER_QUERY } from '../auth/User';
import { Mixpanel } from '../../utils/Mixpanel';

const useStyles = makeStyles(({ layout, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 5px'
  },
  form: {},
  formControl: {}
}));

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $id: ID!
    $tags: [TagInput!]!
    $email: String!
    $name: String!
    $display: String!
  ) {
    updateUser(
      id: $id
      tags: $tags
      email: $email
      name: $name
      display: $display
    ) {
      id
      tags {
        id
        name
      }
    }
  }
`;

// TODO:
//-welcome message and video
// 6. Create mixpannel
// 7. Style

const updateUser = async (e, user, updateUserMutation, tags) => {
  e.preventDefault();
  await updateUserMutation({
    variables: {
      id: user.id,
      name: user.name,
      display: user.display,
      email: user.email,
      tags: tags.map(tag => ({
        name: tag
      }))
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });
  Router.push({
    pathname: '/myfeed'
  });
  Mixpanel.track('Tag Save');
};

const handleIntialCheck = (tag, tags) => {
  const inVal = tag.name;
  for (var i = 0, len = tags.length; i < len; i++) {
    if (tags[i] === inVal) return true;
  }
  return false;
};

const handleTagsChange = (e, tags, setTags) => {
  const options = [...tags];

  Mixpanel.track(e.target.value);
  let index;
  if (e.target.checked) {
    options.push(e.target.value);
  } else {
    index = options.indexOf(+e.target.value);
    options.splice(index, 1);
  }

  setTags(options);
};

export default ({ user, _tags }) => {
  const { container, form, formControl } = useStyles();
  const [tags, setTags] = useState([]);
  useEffect(() => {
    setTags(user.tags.map(({ name }) => name));
  }, [user.tags]);

  return (
    <Mutation mutation={UPDATE_USER_MUTATION}>
      {(update, { error, loading }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        return (
          <div>
            <Grid container className={container}>
              <h2>Select Categories That Interest you</h2>
              <div>
                <form
                  method="post"
                  onSubmit={e => updateUser(e, user, update, tags)}
                  className={form}
                >
                  <FormControl className={formControl}>
                    {_tags.map(tag => (
                      <MenuItem key={tag.id} value={tag.name}>
                        <Checkbox
                          label={tag.name}
                          key={tag.id}
                          value={tag.name}
                          checked={handleIntialCheck(tag, tags)}
                          onChange={e => handleTagsChange(e, tags, setTags)}
                        />
                        <ListItemText primary={tag.name} />
                      </MenuItem>
                    ))}

                    <Button variant="contained" type="submit">
                      Save
                    </Button>
                  </FormControl>
                </form>
              </div>
            </Grid>
          </div>
        );
      }}
    </Mutation>
  );
};
