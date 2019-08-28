import React from "react";
import Questions from "../components/questions";
import Layout from "../components/layout/index.js";

const MyQA = props => (
  <Layout>
    <Questions page={parseFloat(props.query.page) || 1} />
  </Layout>
);

export default MyQA;
