import React from "react";
import ReactDom from "react-dom";
import App from "./App.js";

if (module.hot) {
  module.hot.accept();
}

ReactDom.render(<App />, document.getElementById("root"));
