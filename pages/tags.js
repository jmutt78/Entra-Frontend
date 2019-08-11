import React from "react";
import TagsList from "../components/tags-list";

const MyQA = props => (
  <TagsList page={parseFloat(props.query.page) || 1} id={props.query.id} />
);

export default MyQA;
