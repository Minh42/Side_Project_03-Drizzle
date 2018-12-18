import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../Form/RenderField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {newBriefAction} from '../../reducers/reducer_briefs';

class FormBrief extends Component {
    constructor(props) {
        super(props);
        const initData = {
            "brand": null,
            "brief": null,
            "target": null
        };
        this.props.initialize(initData);
    }

    async componentDidMount() {
        // const { drizzle } = this.props;
        // const contract = drizzle.contracts.CampaignFactory;
        // const test = await contract.methods.getDeployedCampaigns().call();
        // console.log(test)

        // const test2 = await contract.methods.deployedCampaigns("0x7443b4d9e0Bda43b013343fD8a14a2943378509c").call();

    }

    async onSubmit(values) {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.CampaignFactory;
        const { brand, brief, target, gain } = values;
        const hashtags = values.hashtags.split(" ");
        const test = hashtags.map((hashtag) => drizzle.web3.utils.asciiToHex(hashtag));
        await contract.methods
            .createCampaign(brand, brief, target, test, gain)
            .send()

        // values["id"] = this.props.currentCompany._id;
        // values["company"] = this.props.currentCompany.company;
        // this.props.newBriefAction(values, this.props.history);
    }

    render () {
        const { handleSubmit } = this.props;
        return (
            <div class="column">
                <h2 className="title is-2">Create a new brief</h2>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Brand"
                        name="brand"
                        type="text"
                        component= {RenderField}
                        placeholder="Brand"
                    />
                    <Field
                        label="Brief"
                        name="brief"
                        type="text"
                        placeholder="Brief"
                        component={RenderField}
                    />
                    <Field
                        label="Target"
                        name="target"
                        type="number"
                        placeholder="Number of likes to reach"
                        component={RenderField}
                    />
                    <Field
                        label="Hashtags"
                        name="hashtags"
                        type="text"
                        placeholder="Hashtags to share"
                        component={RenderField}
                    />
                    <Field
                        label="Gain"
                        name="gain"
                        type="number"
                        placeholder="What you will earn"
                        component={RenderField}
                    />
                    <button className="button is-link" type="submit">Submit</button>
                </form>
            </div>
        )
    }

}

// function mapStateToProps(state) {
//     return {
//         currentCompany: state.auth.currentCompany
//     };
// }

// function mapDispatchToProps(dispatch) { 
// 	return bindActionCreators({ newBriefAction : newBriefAction}, dispatch);
// } 

const reduxFormBrief = reduxForm({
    form: 'brief'
})(FormBrief);

export default reduxFormBrief;

// export default connect(mapStateToProps, mapDispatchToProps)(reduxFormBrief);
