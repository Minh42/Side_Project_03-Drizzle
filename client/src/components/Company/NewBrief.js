import React, { Component } from 'react';
import FormBrief from './FormBrief';
import { DrizzleContext } from "drizzle-react";
import PropTypes from "prop-types";

class NewBrief extends Component {
    render() {
        return (
            <DrizzleContext.Consumer>
            {drizzleContext => {
                const { drizzle, drizzleState, initialized } = drizzleContext;
                console.log(drizzle.contracts.CampaignFactory)
                console.log(drizzleState)
                if (!initialized) {
                    return "Loading...";
                }
                return (
                    <FormBrief drizzle={drizzle} drizzleState={drizzleState} />
                );
            }}
            </DrizzleContext.Consumer>
        );
    }
}

NewBrief.contextTypes = {
    drizzle: PropTypes.object
}

export default NewBrief;