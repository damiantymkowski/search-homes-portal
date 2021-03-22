import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/rejestracja" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
