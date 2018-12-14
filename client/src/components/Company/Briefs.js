import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getBriefsAction} from '../../reducers/reducer_briefs';

class Briefs extends Component {
    componentDidMount() {
        if (this.props.currentCompany) {
            this.props.getBriefsAction(this.props.currentCompany._id);
        }
    }

    renderBriefs() {
        if (this.props.briefs) {
            console.log(this.props.briefs)
            return this.props.briefs.map((brief, i) => {
                return (
                    <tr key={i}>
                        <td>{brief.company}</td>
                        <td>{brief.brand}</td>
                        <td>{brief.brief}</td>
                        <td>{brief.target}</td>
                        <td>{brief.appliedUsers}</td>
                    </tr>
                )
            })
        }
    }

    render() {
        return (
            <div class="column is-two-fifths">
                <h2 className="title is-2">Ongoing missions</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Brand</th>
                            <th>Brief</th>
                            <th>Target</th>
                            <th>Applied Users</th>
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
        currentCompany: state.auth.currentCompany,
        briefs: state.briefs.briefs
    };
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ getBriefsAction : getBriefsAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Briefs);