import React, { Component } from 'react';
import BriefsList from './BriefsList';
import { DrizzleContext } from "drizzle-react";
import PropTypes from "prop-types";

class Briefs extends Component {
    render() {
        return (
            <DrizzleContext.Consumer>
            {drizzleContext => {
                const { drizzle, drizzleState, initialized } = drizzleContext;
                if (!initialized) {
                    return "Loading...";
                }
                return (
                    <BriefsList drizzle={drizzle} drizzleState={drizzleState} />
                );
            }}
            </DrizzleContext.Consumer>
        );
    }
}

Briefs.contextTypes = {
    drizzle: PropTypes.object
}

export default Briefs;