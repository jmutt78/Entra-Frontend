import React from "react";
import SelectedUserAnswers from "../components/user-answer-list/SelectedUserAnswers.js";

const USA = props => (
  <SelectedUserAnswers
    page={parseFloat(props.query.page) || 1}
    id={props.query.id}
  />
);

export default USA;
