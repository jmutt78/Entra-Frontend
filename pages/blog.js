import React from 'react';
import Blog from '../components/blog-feed';
import Layout from '../components/layout/index.js';

const BlogFeed = props => (
  <Layout>
    <Blog categoryId={16} name={'Blog'} />
  </Layout>
);

export default BlogFeed;
