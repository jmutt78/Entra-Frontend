import React from "react";
import UserAnswers from "../components/user-answer-list/UserAnswers.js";

const UA = props => (
  <UserAnswers page={parseFloat(props.query.page) || 1} id={props.query.id} />
);

export default UA;
