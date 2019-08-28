import React from "react";
import DisplayBlog from "../components/post";
import Layout from "../components/layout/index.js";

const Post = props => (
  <Layout>
    <DisplayBlog id={props.query.id} />
  </Layout>
);

export default Post;
