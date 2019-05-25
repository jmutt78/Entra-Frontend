import React from "react";
import CreateQuestion from "../components/my-questions";

const MyQA = props => (
  <CreateQuestion page={parseFloat(props.query.page) || 1} />
);

export default MyQA;
