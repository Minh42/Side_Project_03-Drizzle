import React, { Component } from 'react';
import Companies from './Signin/Companies';
import Influencers from './Signin/Influencers';

class Signin extends Component {
    render() {
        return (
            <div class="columns">
                <Companies />
                <Influencers />
            </div>
        );
    }
}

export default Signin;