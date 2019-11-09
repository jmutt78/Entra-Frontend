import React, { Component } from 'react';
import { Query } from 'react-apollo';
import IdeaForm from './IdeaForm';
import Error from './../ErrorMessage.js';

import CircularProgress from '@material-ui/core/CircularProgress';
import questionQuery from '../question-display/questionQuery';

class UpdateIdea extends Component {
  render() {
    return (
      <Query
        query={questionQuery}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress style={{ margin: 20 }} />;
          if (error) return <Error error={error} />;
          const { question } = data;

          return <IdeaForm question={question} />;
        }}
      </Query>
    );
  }
}

export default UpdateIdea;
