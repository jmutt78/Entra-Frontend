import React from "react";
import UserAnswers from "../components/user-answer-list/UserAnswers.js";
import Layout from "../components/layout/index.js";

const UA = props => (
  <Layout>
    <UserAnswers page={parseFloat(props.query.page) || 1} id={props.query.id} />
  </Layout>
);

export default UA;
