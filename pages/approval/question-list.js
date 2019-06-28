import React from "react";
import AprrovalQuestions from "../../components/approval-list";

const ApprovalQuestions = props => (
  <AprrovalQuestions page={parseFloat(props.query.page) || 1} />
);

export default ApprovalQuestions;
