import React from 'react';

import Posts from '../components/posts';
import Layout from '../components/layout';

const PostsPage = props => (
  <Layout>
    <Posts page={parseFloat(props.query.page) || 1} />
  </Layout>
);

export default PostsPage;
