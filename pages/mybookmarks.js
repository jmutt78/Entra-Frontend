import React from "react";
import MyBookMark from "../components/display-mybookmarks";
import Layout from "../components/layout/index.js";

const MyQA = props => (
  <Layout>
    <MyBookMark page={parseFloat(props.query.page) || 1} />
  </Layout>
);

export default MyQA;
