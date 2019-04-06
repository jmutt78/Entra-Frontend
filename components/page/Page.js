import React, { Component } from "react";
import Header from "../header/Header.js";
import Meta from "../meta/Meta.js";

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
