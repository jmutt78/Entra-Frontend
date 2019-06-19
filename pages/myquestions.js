import React from "react";
import MyQuestions from "../components/my-questions";

const MyQA = props => <MyQuestions page={parseFloat(props.query.page) || 1} />;

export default MyQA;
