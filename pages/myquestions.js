import React from "react";
import MyQuestions from "../components/my-questions";
import Layout from "../components/layout/index.js";

const MyQA = props => (
  <Layout>
    <MyQuestions page={parseFloat(props.query.page) || 1} />
  </Layout>
);

export default MyQA;
