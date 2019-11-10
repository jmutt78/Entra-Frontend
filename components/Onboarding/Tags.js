import Error from './../ErrorMessage.js';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

import { CURRENT_USER_QUERY } from '../auth/User';
import { Mixpanel } from '../../utils/Mixpanel';
import './index.css';

const useStyles = makeStyles(({ layout, palette }) => ({
  formContainer: {
    margin: '2rem 1rem 2rem 1rem',
    background: palette.secondary.main,
    padding: '1rem',
    borderRadius: 2,
    display: 'flex',
    flexWrap: 'wrap'
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  }
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
  const { formContainer, buttonContainer } = useStyles();
  const [tags, setTags] = useState([]);
  const [hoverState, setHoverState] = useState(null);
  useEffect(() => {
    setTags(user.tags.map(({ name }) => name));
  }, [user.tags]);

  return (
    <Mutation mutation={UPDATE_USER_MUTATION}>
      {(update, { error, loading }) => {
        if (loading) return <CircularProgress style={{ margin: 20 }} />;
        if (error) return <Error error={error} />;
        return (
          <form method="post" onSubmit={e => updateUser(e, user, update, tags)}>
            <FormControl style={{ width: '100%' }}>
              <div className={formContainer}>
                {_tags.map(tag => (
                  <div
                    className="tag-select-target"
                    onMouseEnter={() => setHoverState(tag.id)}
                    onMouseLeave={() => setHoverState(null)}
                    style={{ height: '3.5rem' }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={handleIntialCheck(tag, tags)}
                          key={tag.id}
                          onChange={e => handleTagsChange(e, tags, setTags)}
                          value={tag.name}
                          color="primary"
                        />
                      }
                      label={
                        <span
                          style={{
                            fontWeight: handleIntialCheck(tag, tags)
                              ? 700
                              : hoverState === tag.id
                              ? 700
                              : 500
                          }}
                        >
                          {tag.name}
                        </span>
                      }
                    />
                  </div>
                ))}
              </div>

              <div className={buttonContainer}>
                <Button
                  variant="contained"
                  type="submit"
                  style={{ margin: '0.5rem 1rem' }}
                >
                  Save
                </Button>
              </div>
            </FormControl>
          </form>
        );
      }}
    </Mutation>
  );
};
