import React from "react";
import DisplayUser from "../components/user-display";
import Layout from "../components/layout/index.js";

const User = props => (
  <Layout>
    <DisplayUser id={props.query.id} />
  </Layout>
);

export default User;
