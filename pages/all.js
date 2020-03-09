import React from 'react';
import Head from 'next/head';
import Questions from '../components/questions';
import Layout from '../components/layout/index.js';

function All(props) {
  return (
    <Layout>
      <Head>
        <title>ENTRA - All Questions</title>
      </Head>
      <Questions page={parseFloat(props.query.page) || 1} />
    </Layout>
  );
}
export default All;
