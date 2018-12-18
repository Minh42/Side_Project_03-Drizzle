import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { getAllBriefsAction, applyBriefAction } from '../../reducers/reducer_briefs';
import Campaign from '../../contracts/Campaign.json';

class AllBriefsList extends Component {
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
        const users = new Array();
        for (var i = 0; i < deployedCampaigns.length; i++) {
            let campaign = await new web3.eth.Contract(
                Campaign.abi,
                deployedCampaigns[i]
            );
            let mission = await campaign.methods.getMission('0x5335727645E3EA1001148211A32Bd75b7174dF82').call();
            let count = await campaign.methods.getUsersCount().call();
            console.log(count)
            for (var j = 0; j < count.length; j++) {
                console.log(j)
                let user = await campaign.methods.getUser(j).call();
                users.push({
                    userAddress: user[0],
                    reach: user[1],
                    paid: user[2]
                })
                console.log(users)
            }
            array.push({
                deployedCampaigns: deployedCampaigns[i],
                brand: mission[0],
                brief: mission[1],
                target: mission[2],
                hashtags: web3.utils.hexToAscii(mission[3][0]),
                gain: mission[4],
                users: users
            })
        }
        this.setState({
            missions: array
        })
        console.log(this.state.missions)

     

        // this.props.getAllBriefsAction();
    }


    async onSubmit(deployedCampaigns) {
        const { drizzle } = this.props;
        const web3 = drizzle.web3;
        const accounts = await web3.eth.getAccounts();
        let campaign = await new web3.eth.Contract(
            Campaign.abi,
            deployedCampaigns
        );
        await campaign.methods.apply().send({
            from: accounts[0]
        });

        // let test = new Array();
        // test["userID"] = this.props.currentUser;
        // test["missionID"] = id;
        // this.props.applyBriefAction(test)
    }

    renderBriefs() {
        if (this.state.missions) {
            return this.state.missions.map((mission, i) => {
                return (
                    <tr key={i}>
                        <td>{mission.deployedCampaigns}</td>
                        <td>{mission.brand}</td>
                        <td>{mission.brief}</td>
                        <td>{mission.target}</td>
                        <td>{mission.hashtags}</td>
                        <td>{mission.gain}</td>
                        <td><button type="button" className="button" onClick={() => this.onSubmit(mission.deployedCampaigns)}>Apply for this mission</button></td>
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
                            <th>deployedCampaigns</th>
                            <th>Brand</th>
                            <th>Brief</th>
                            <th>Target</th>
                            <th>hashtags</th>
                            <th>Gain</th>
                            <th>Apply</th>
                        </tr>
                    </thead>
                    {this.renderBriefs()}
                </table>
            </div>
        );
    }

}

// function mapStateToProps(state) {
//     return {
//         briefs: state.briefs.briefs,
//         currentUser: state.auth.currentUser
//     };
// }

// function mapDispatchToProps(dispatch) { 
// 	return bindActionCreators({ 
//         getAllBriefsAction : getAllBriefsAction,
//         applyBriefAction : applyBriefAction
//     }, dispatch);
// } 

export default AllBriefsList;

// export default connect(mapStateToProps, mapDispatchToProps)(AllBriefsList);