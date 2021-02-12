import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "regenerator-runtime/runtime.js";

// fetch json profile data and convert into valid object
const profile = JSON.parse(document.getElementById("data").innerText);

ReactDOM.render(<App profile={profile} />, document.getElementById("root"));
