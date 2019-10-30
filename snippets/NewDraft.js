import React from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import Error from './../ErrorMessage.js';
import Router from 'next/router';

import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { CURRENT_USER_QUERY } from '../auth/User';
import { perPage } from '../../config.js';
import tagsListQuery from './tagsListQuery';
import { Mixpanel } from '../../utils/Mixpanel';

const styles = ({ layout, palette }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 5px'
  },

  formContainer: {
    width: '100%',
    maxWidth: 1000,
    display: 'flex',
    justifyContent: 'center'
  }
});

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
// 3. Create a page that allows the user to edit tag options
// 5. Create the my feed link that has controls if someone skips this page
// 4. Create logic for controlling each page in the onboarding also a skip button
// 6. Create mixpannel
// 7. Style

class Tags extends React.Component {
  state = {
    tags: []
  };

  handleUserTags() {}

  handleTagsChange = e => {
    const options = this.state.tags;
    let index;
    if (e.target.checked) {
      options.push(e.target.value);
    } else {
      index = options.indexOf(+e.target.value);
      options.splice(index, 1);
    }

    this.setState({ tags: options });
  };

  updateUser = async (e, user, updateUserMutation) => {
    e.preventDefault();
    const res = await updateUserMutation({
      variables: {
        id: user.id,
        name: user.name,
        display: user.display,
        email: user.email,
        tags: this.state.tags.map(tag => ({
          name: tag
        }))
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    });
    Router.push({
      pathname: '/myfeed'
    });
    console.log('update');
  };

  render() {
    const { classes } = this.props;
    const user = this.props.user;
    const tagId = user.tags.map(({ id }) => id);
    console.log(tagId);

    return (
      <Query query={tagsListQuery} variables={{}}>
        {({ data, loading, error }) => {
          return (
            <Mutation mutation={UPDATE_USER_MUTATION}>
              {(updateUser, { error, loading }) => {
                if (error) return <Error error={error} />;
                return (
                  <div>
                    <Grid container className={classes.container}>
                      <h2>Select Categories That Interest you</h2>
                      <div>
                        <form
                          method="post"
                          onSubmit={e => this.updateUser(e, user, updateUser)}
                          className={classes.form}
                        >
                          <FormControl className={classes.formControl}>
                            {data.tags.map(tag => (
                              <MenuItem key={tag.id} value={tag.name}>
                                <Checkbox
                                  label={tag.name}
                                  key={tag.id}
                                  value={tag.name}
                                  onChange={this.handleTagsChange}
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
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(Tags);
