import React from 'react';
import MyIdeas from '../components/my-ideas';
import Layout from '../components/layout/index.js';

const Ideas = props => (
  <Layout>
    <MyIdeas page={parseFloat(props.query.page) || 1} />
  </Layout>
);

export default Ideas;
