import React from 'react';
import Intro from '../components/intro-post';
import Layout from '../components/layout/index.js';

const IntroPage = props => (
  <Layout>
    <Intro id={props.query.id} />
  </Layout>
);

export default IntroPage;
