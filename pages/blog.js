import React from "react";
import DisplayBlog from "../components/blog";

const Blog = props => <DisplayBlog id={props.query.id} />;

export default Blog;
