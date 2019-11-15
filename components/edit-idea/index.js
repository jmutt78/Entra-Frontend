import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { IDEAS_QUERY } from '../idea-display/index.js';
import IdeaForm from './IdeaForm';
import Error from './../ErrorMessage.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class UpdateIdea extends Component {
  render() {
    return (
      <Query
        query={IDEAS_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data: { businessIdea }, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          console.log(businessIdea);
          return <IdeaForm businessIdea={businessIdea} />;
        }}
      </Query>
    );
  }
}

export default UpdateIdea;
