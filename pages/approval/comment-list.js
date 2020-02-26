import React from 'react';
import IntroComments from '../../components/intro-comments';

const ApprovalCommentPage = props => (
  <IntroComments page={parseFloat(props.query.page) || 1} />
);

export default ApprovalCommentPage;
