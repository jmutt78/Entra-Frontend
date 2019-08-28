import React from "react";
import UpdateAnswer from "../components/edit-answers";
import Layout from "../components/layout/index.js";

const EditAnswer = props => (
  <Layout>
    <UpdateAnswer id={props.query.id} />
  </Layout>
);

export default EditAnswer;
