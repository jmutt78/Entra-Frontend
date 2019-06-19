import React from "react";
import Questions from "../components/questions";

const MyQA = props => <Questions page={parseFloat(props.query.page) || 1} />;

export default MyQA;
