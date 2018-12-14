import React, { Component } from 'react';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

class LandingPage extends Component {
    render() {
        return (
            <section class="hero is-light is-fullheight">
                <Signin /> 
            </section>
        );
    }
}

export default LandingPage;