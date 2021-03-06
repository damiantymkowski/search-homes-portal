import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";
import User from "./pages/User/User";
import { getSessionCookie } from "./shared/sessions";
import ProtectedRoute from "./shared/ProtectedRoute";

export const SessionContext = React.createContext(getSessionCookie());

function App() {
  const [session, setSession] = useState(getSessionCookie());
  useEffect(() => {
    setSession(getSessionCookie());
  }, [session]);

  return (
    <SessionContext.Provider value={session}>
      <Router>
        <Switch>
          <ProtectedRoute
            session={session}
            path="/mojekonto"
            component={User}
          />
          <Route exact path="/" component={Homepage} />
          <Route path="/rejestracja" component={Register} />
          <Route path="/logowanie" component={Login} />
        </Switch>
      </Router>
    </SessionContext.Provider>
  );
}

export default App;
