import React from 'react';
import MyFeed from '../components/myfeed';
import Layout from '../components/layout/index.js';

const MyFe = props => (
  <Layout>
    <MyFeed page={parseFloat(props.query.page) || 1} />
  </Layout>
);

export default MyFe;
