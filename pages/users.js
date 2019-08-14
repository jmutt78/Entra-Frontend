import React from "react";
import UserList from "../components/user-list";

const MyQA = props => (
  <UserList page={parseFloat(props.query.page) || 1} id={props.query.id} />
);

export default MyQA;
