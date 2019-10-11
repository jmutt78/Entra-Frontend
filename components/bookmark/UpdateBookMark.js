import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Bookmark from '@material-ui/icons/Bookmark';

import CircularProgress from '@material-ui/core/CircularProgress';
import questionListQuery from '../question-list/questionListQuery';
import Error from './../ErrorMessage.js';
import { CURRENT_USER_QUERY } from '../auth/User';
import { Mixpanel } from '../../utils/Mixpanel';

export const DELETE_BOOKMARK_MUTATION = gql`
  mutation DELETE_BOOKMARK_MUTATION($id: ID!) {
    deleteBookMark(id: $id) {
      id
    }
  }
`;

const styles = {
  icon: {
    fontSize: 30,
    marginTop: 3,
    color: '#E27D60'
  },
  viewsCount: {
    color: '#2d3436', //palette.accent.dark,
    fontSize: '1.2rem',
    padding: '8px 0 5px 8px'
  }
};

class DeleteBookMark extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Mutation
        mutation={DELETE_BOOKMARK_MUTATION}
        variables={{ id: this.props.id[0] }}
        refetchQueries={[
          {
            query: questionListQuery,
            variables: { filter: 'My BookMarked' }
          },
          { query: CURRENT_USER_QUERY }
        ]}
      >
        {(deleteBookMark, { error, loading }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          return (
            <div
              onClick={() => {
                deleteBookMark();
                Mixpanel.track('Delete Bookmark');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <Bookmark className={classes.icon} />

              <span className={classes.viewsCount}>Bookmark this</span>
              <Error error={error} />
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(DeleteBookMark);
