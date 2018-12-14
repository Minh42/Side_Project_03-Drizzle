import React, { Component } from 'react';
import Briefs from '../components/Company/Briefs';
import NewBrief from '../components/Company/NewBrief';

class Company extends Component {
    render() {
        return (
            <div class="columns">
                <Briefs />
                <NewBrief />
            </div>
        );
    }
}

export default Company;