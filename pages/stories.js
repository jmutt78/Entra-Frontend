import React from 'react';
import Blog from '../components/blog-feed';
import Layout from '../components/layout/index.js';

const StoriesFeed = props => (
  <Layout>
    <Blog categoryId={67} name={'Entra Interviews'} />
  </Layout>
);

export default StoriesFeed;
