import React from "react";
import MyAnswers from "../components/answer-list/MyAnswers";

const MyAnswerPage = props => (
  <MyAnswers page={parseFloat(props.query.page) || 1} />
);

export default MyAnswerPage;
