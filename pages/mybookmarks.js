import React from "react";
import MyBookMark from "../components/display-mybookmarks";

const MyQA = props => <MyBookMark page={parseFloat(props.query.page) || 1} />;

export default MyQA;
