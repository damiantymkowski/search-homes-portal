import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/rejestracja" component={Register} />
        <Route path="/logowanie" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
