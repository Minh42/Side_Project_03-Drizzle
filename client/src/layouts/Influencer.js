import React, { Component } from 'react';
import AllBriefs from '../components/Influencer/AllBriefs';
import Briefs from '../components/Influencer/Briefs';

class Influencer extends Component {
    render() {
        return (
            <div class="columns">
                <Briefs />
                <AllBriefs />
            </div>
        );
    }
}

export default Influencer;