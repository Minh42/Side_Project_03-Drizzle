import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getBriefsAction} from '../../reducers/reducer_briefs';
import Campaign from '../../contracts/Campaign.json';

class BriefsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            missions: null
        }
    }

    async componentDidMount() {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.CampaignFactory;
        const deployedCampaigns = await contract.methods.getDeployedCampaigns().call();
        const web3 = drizzle.web3;

        // better store all deployedCampaigns addresses in a database
        const array = new Array();
        for (var i = 0; i < deployedCampaigns.length; i++) {
            let campaign = await new web3.eth.Contract(
                Campaign.abi,
                deployedCampaigns[i]
            );
            let mission = await campaign.methods.getMission('0x5335727645E3EA1001148211A32Bd75b7174dF82').call();
            array.push({
                brand: mission[0],
                brief: mission[1],
                target: mission[2],
                hashtags: web3.utils.hexToAscii(mission[3][0]),
                gain: mission[4]
            })
        }
        this.setState({
            missions: array
        })
 
        // if (this.props.currentCompany) {
        //     this.props.getBriefsAction(this.props.currentCompany._id);
        // }
    }

    renderBriefs() {
        if (this.state.missions) {
            return this.state.missions.map((mission, i) => {
                return (
                    <tr key={i}>
                        <td>{mission.brand}</td>
                        <td>{mission.brief}</td>
                        <td>{mission.target}</td>
                        <td>{mission.hashtags}</td>
                        <td>{mission.gain}</td>
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
                            <th>Brand</th>
                            <th>Brief</th>
                            <th>Target</th>
                            <th>hashtags</th>
                            <th>Gain</th>
                        </tr>
                    </thead>
                    {this.renderBriefs()}
                </table>
            </div>  
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         currentCompany: state.auth.currentCompany,
//         briefs: state.briefs.briefs
//     };
// }

// function mapDispatchToProps(dispatch) { 
// 	return bindActionCreators({ getBriefsAction : getBriefsAction}, dispatch);
// }

export default BriefsList;

// export default connect(mapStateToProps, mapDispatchToProps)(BriefsList);