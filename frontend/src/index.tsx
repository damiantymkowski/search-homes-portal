import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap');
  body {
    font-family: Geomanist,Arial,sans-serif;
  }
`;
ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
