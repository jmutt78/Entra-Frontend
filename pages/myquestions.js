import React from 'react';
import MyQuestions from '../components/my-questions';
import Layout from '../components/layout/index.js';
import { ScrollablePageContainer } from '../src/styledComponents';

const MyQA = props => (
  <Layout>
    <ScrollablePageContainer>
      <MyQuestions page={parseFloat(props.query.page) || 1} />
    </ScrollablePageContainer>
  </Layout>
);

export default MyQA;
