import React from 'react';
import PostsApproval from '../../components/posts/PostApproval.js';

const ApprovalPostPage = props => (
  <PostsApproval page={parseFloat(props.query.page) || 1} />
);

export default ApprovalPostPage;
