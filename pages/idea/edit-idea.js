import React from 'react';
import UpdateIdea from '../components/edit-idea';
import Layout from '../components/layout/index.js';

const EditIdea = props => (
  <Layout>
    <UpdateIdea id={props.query.id} />
  </Layout>
);

export default EditIdea;
