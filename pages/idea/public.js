import React from 'react';
import AllIdeas from '../../components/public-ideas';
import Layout from '../../components/layout/index.js';

const PublicIdeas = props => (
  <Layout>
    <AllIdeas page={parseFloat(props.query.page) || 1} />
  </Layout>
);

export default PublicIdeas;
