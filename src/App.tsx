import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,Switch
} from 'react-router-dom';
import Register from './pages/Register/Register';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/rejestracja">
                    <Register />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;