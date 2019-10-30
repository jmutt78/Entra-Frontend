import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Error from './../ErrorMessage.js';
import Router from 'next/router';

import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { CURRENT_USER_QUERY } from '../auth/User';
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
//-welcome message and video
// 6. Create mixpannel
// 7. Style

class Tags extends React.Component {
  state = {
    tags: []
  };

  componentDidMount(data) {
    const tagId = this.props.user.tags.map(({ name }) => name);

    this.setState({
      tags: tagId
    });
  }

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

  handleIntialCheck(tag) {
    const arr = this.state.tags;
    const inVal = tag.name;
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i] === inVal) return true;
    }
    return false;
  }

  render() {
    const { classes } = this.props;
    const user = this.props.user;

    return (
      <Mutation mutation={UPDATE_USER_MUTATION}>
        {(updateUser, { error, loading }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
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
                      {this.props.tag.map(tag => (
                        <MenuItem key={tag.id} value={tag.name}>
                          <Checkbox
                            label={tag.name}
                            key={tag.id}
                            value={tag.name}
                            checked={this.handleIntialCheck(tag)}
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
  }
}

export default withStyles(styles)(Tags);
