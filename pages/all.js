import React from "react";
import Questions from "../components/questions";
import Layout from "../components/layout/index.js";

function All(props) {
  return <Questions page={parseFloat(props.query.page) || 1} />;
}
export default All;
