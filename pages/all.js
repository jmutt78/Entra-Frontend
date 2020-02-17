import React from 'react';
import Questions from '../components/questions';
import Layout from '../components/layout/index.js';
import { ScrollablePageContainer } from '../src/styledComponents';

function All(props) {
  return (
    <Layout>
      <ScrollablePageContainer>
        <Questions page={parseFloat(props.query.page) || 1} />
      </ScrollablePageContainer>
    </Layout>
  );
}
export default All;
