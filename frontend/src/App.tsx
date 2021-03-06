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
import { initialState, reducer } from "./shared/Reducers/AuthReducer";
import AddOffer from "./pages/Offer/Add/AddOffer";
import UpdateOffer from "./pages/Offer/Update/UpdateOffer";
import Messages from "./pages/Messages/Messages";
import Conversation from "./pages/Conversation/Conversation";
import Admin from "./pages/Admin/Admin";
import Manage from "./pages/Admin/Manage/Manage";
import SearchResult from "./pages/SearchResult/SearchResult";

type ContextType = {
  state: any;
  dispatch: React.Dispatch<any>;
};

export const AuthContext = React.createContext<ContextType>({
  state: "",
  dispatch: () => null,
});

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
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
              path="/edytuj-ogloszenie:id"
              component={UpdateOffer}
            />
            <ProtectedRoute
              session={state.isAuthenticated}
              path="/dodaj-ogloszenie"
              component={AddOffer}
            />
            <ProtectedRoute
              session={state.isAuthenticated}
              path="/wiadomosci"
              component={Messages}
            />
            <ProtectedRoute
              session={state.isAuthenticated}
              path="/konwersacja:id"
              component={Conversation}
            />
            <Route exact path="/" component={Homepage} />
            <Route path="/rejestracja" component={Register} />
            <Route path="/logowanie" component={Login} />
            <Route path="/ogloszenie:id" component={Offer} />
            <Route path="/wyloguj" component={Logout} />
            <Route path="/admin" component={Admin} />
            <Route path="/admin-panel" component={Manage} />
            <Route path="/wyszukiwarka" component={SearchResult} />
          </Switch>
        </AnimatePresence>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
