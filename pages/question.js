import React from "react";
import DisplayQuestion from "../components/question-display";

const Question = props => <DisplayQuestion id={props.query.id} />;

export default Question;
