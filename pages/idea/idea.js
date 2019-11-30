import React from 'react';
import DisplayIdea from '../../components/idea-display';
import Layout from '../../components/layout/index.js';

const Idea = props => (
  <Layout>
    <DisplayIdea id={props.query.id} />
  </Layout>
);

export default Idea;
