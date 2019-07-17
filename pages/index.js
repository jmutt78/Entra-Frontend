import React from "react";
import Questions from "../components/questions";

function Home(props) {
  return (
    <div>
      <Questions page={parseFloat(props.query.page) || 1} />
    </div>
  );
}
export default Home;
