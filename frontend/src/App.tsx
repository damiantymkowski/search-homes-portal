import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";
import User from "./pages/User/User";
import ProtectedRoute from "./shared/ProtectedRoute";
import { AnimatePresence } from "framer-motion";
import Offer from "./pages/Offer/Offer";
import Logout from "./components/Logout/Logout";
import {initialState, reducer} from "./shared/Reducers/AuthReducer";
import AddOffer from "./pages/Offer/Add/AddOffer";

type ContextType = {
  state: any,
  dispatch: React.Dispatch<any>
}

export const AuthContext = React.createContext<ContextType>({state: "", dispatch: () => null});

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{state,dispatch}}>
      <Router>
        <AnimatePresence>
          <Switch>
            <ProtectedRoute
              session={state.isAuthenticated}
              path="/mojekonto"
              component={User}
            />
            <ProtectedRoute
                session={state.isAuthenticated}
                path="/dodaj-ogloszenie"
                component={AddOffer}
            />
            <Route exact path="/" component={Homepage} />
            <Route path="/rejestracja" component={Register} />
            <Route path="/logowanie" component={Login} />
            <Route path="/ogloszenie" component={Offer}/>
            <Route path="/wyloguj" component={Logout}/>
          </Switch>
        </AnimatePresence>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
