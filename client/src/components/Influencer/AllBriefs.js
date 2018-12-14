import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllBriefsAction, applyBriefAction } from '../../reducers/reducer_briefs';

class AllBriefs extends Component {
    componentDidMount() {
        this.props.getAllBriefsAction();
    }

    onSubmit(id) {
        let test = new Array();
        test["userID"] = this.props.currentUser;
        test["missionID"] = id;
        this.props.applyBriefAction(test)
    }

    renderBriefs() {
        if (this.props.briefs) {
            return this.props.briefs.map((brief, i) => {
                return (
                    <tr key={i}>
                        <td>{brief._id}</td>
                        <td>{brief.company}</td>
                        <td>{brief.brand}</td>
                        <td>{brief.brief}</td>
                        <td>{brief.target}</td>
                        <td><button type="button" className="button" onClick={() => this.onSubmit(brief._id)}>Apply for this mission</button></td>
                    </tr>
                )
            })
        }

    }

    render() {
        return (
            <div class="column">
                <h2 className="title is-2">See all missions</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Mission ID</th>
                            <th>Company</th>
                            <th>Brand</th>
                            <th>Brief</th>
                            <th>Target</th>
                            <th>Apply</th>
                        </tr>
                    </thead>
                    {this.renderBriefs()}
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        briefs: state.briefs.briefs,
        currentUser: state.auth.currentUser
    };
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ 
        getAllBriefsAction : getAllBriefsAction,
        applyBriefAction : applyBriefAction
    }, dispatch);
} 

export default connect(mapStateToProps, mapDispatchToProps)(AllBriefs);