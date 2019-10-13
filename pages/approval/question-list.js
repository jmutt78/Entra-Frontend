import React from 'react';
import AprrovalQuestions from '../../components/approval-list';
import Layout from '../../components/layout/index.js';

const ApprovalQuestions = props => (
  <Layout>
    <AprrovalQuestions page={parseFloat(props.query.page) || 1} />
  </Layout>
);

export default ApprovalQuestions;
