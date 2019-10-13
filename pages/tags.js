import React from 'react';
import TagsList from '../components/tags-list';
import Layout from '../components/layout/index.js';

const MyQA = props => (
  <Layout>
    <TagsList page={parseFloat(props.query.page) || 1} id={props.query.id} />
  </Layout>
);

export default MyQA;
