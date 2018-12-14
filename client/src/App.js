import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import requireAuth from './utils/HOC/requireAuth';

import Header from './components/Header';
import LandingPage from './layouts/LandingPage';
import Company from './layouts/Company';
import Influencer from './layouts/Influencer';
import NotFound from './layouts/NotFound';

class App extends Component { 
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route exact path="/company" component={Company} />
                        <Route exact path="/influencer" component={Influencer} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
