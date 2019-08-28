import React from "react";
import MyAnswers from "../components/answer-list/MyAnswers";
import Layout from "../components/layout/index.js";

const MyAnswerPage = props => (
  <Layout>
    <MyAnswers page={parseFloat(props.query.page) || 1} />
  </Layout>
);

export default MyAnswerPage;
