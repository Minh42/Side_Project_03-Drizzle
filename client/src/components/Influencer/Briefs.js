import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllMissionsAction } from '../../reducers/reducer_missions';

class Briefs extends Component {
    // componentDidMount() {
    //     this.props.getAllMissionsAction(this.props.currentUser)
    // }

    renderMissions() {
        if (this.props.missions) {
            return this.props.missions.map((mission, i) => {
                return (
                    <tr key={i}>
                        <td>{mission._id}</td>
                        <td>{mission.company}</td>
                        <td>{mission.brand}</td>
                        <td>{mission.brief}</td>
                        <td>{mission.target}</td>
                    </tr>
                )
            })
        }
    }

    render() {

        return (
            <div class="column is-two-fifths">
                <h2 className="title is-2">My missions</h2>
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
                    {this.renderMissions()}
                </table>    
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         currentUser: state.auth.currentUser,
//         missions: state.missions.missions
//     };
// }

// function mapDispatchToProps(dispatch) { 
// 	return bindActionCreators({ 
//         getAllMissionsAction : getAllMissionsAction
//     }, dispatch);
// } 

export default Briefs;

// export default connect(mapStateToProps, mapDispatchToProps)(Briefs);