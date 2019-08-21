import React from "react";
import UpdateQuestion from "../components/edit-question";
import Layout from "../components/layout/index.js";

const EditQuestion = props => (
  <Layout>
    <UpdateQuestion id={props.query.id} />
  </Layout>
);

export default EditQuestion;
