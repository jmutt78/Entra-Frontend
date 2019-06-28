import React from "react";
import AprrovalAnswers from "../../components/answer-list/ApprovalAnswers";

const ApprovalAnswerPage = props => (
  <AprrovalAnswers page={parseFloat(props.query.page) || 1} />
);

export default ApprovalAnswerPage;
