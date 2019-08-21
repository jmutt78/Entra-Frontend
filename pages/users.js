import React from "react";
import UserList from "../components/user-list";
import Layout from "../components/layout/index.js";

const MyQA = props => (
  <Layout>
    <UserList page={parseFloat(props.query.page) || 1} id={props.query.id} />
  </Layout>
);

export default MyQA;
