import React, { Component } from 'react';
import AllBriefsList from './AllBriefsList';
import { DrizzleContext } from "drizzle-react";
import PropTypes from "prop-types";

class AllBriefs extends Component {
    render() {
        return (
            <DrizzleContext.Consumer>
            {drizzleContext => {
                const { drizzle, drizzleState, initialized } = drizzleContext;
                if (!initialized) {
                    return "Loading...";
                }
                return (
                    <AllBriefsList drizzle={drizzle} drizzleState={drizzleState} />
                );
            }}
            </DrizzleContext.Consumer>
        );
    }
}

AllBriefs.contextTypes = {
    drizzle: PropTypes.object
}

export default AllBriefs;