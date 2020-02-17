import React from 'react';
import MyFeed from '../components/myfeed';
import Layout from '../components/layout/index.js';
import { ScrollablePageContainer } from '../src/styledComponents';

function MyFe(props) {
  return (
    <Layout>
      <ScrollablePageContainer>
        <MyFeed page={parseFloat(props.query.page) || 1} />
      </ScrollablePageContainer>
    </Layout>
  );
}
export default MyFe;
