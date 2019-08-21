import React from "react";
import DisplayQuestion from "../components/question-display";
import Layout from "../components/layout/index.js";

const Question = props => (
  <Layout>
    <DisplayQuestion id={props.query.id} />
  </Layout>
);

export default Question;
