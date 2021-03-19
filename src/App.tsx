import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,Switch
} from 'react-router-dom';

import Register from './pages/Register/Register';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path={"/a"} exact component={Register} />
                </Switch>
            </Router>
    );
    }
}

export default App;