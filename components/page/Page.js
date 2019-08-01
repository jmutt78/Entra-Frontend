import React, { Component } from "react";
import Header from "../header/Header.js";
import Meta from "../meta/Meta.js";
import Footer from "../footer";

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Page;
