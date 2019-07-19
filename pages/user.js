import React from "react";
import DisplayUser from "../components/user-display";

const User = props => <DisplayUser id={props.query.id} />;

export default User;
