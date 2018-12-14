import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signInAction } from '../../reducers/reducer_auth';
import RenderField from '../Form/RenderField';

class Companies extends Component {
    constructor(props) {
        super(props);
        const initData = {
            "email": null,
            "password": null
        };
        this.props.initialize(initData);
    }

    onSubmit(values) {
        this.props.signInAction(values, this.props.history);
    }
 
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="column is-half">
                <h2 className="title is-2">For companies</h2>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label="Email"
                        name="email"
                        type="text"
                        component= {RenderField}
                        placeholder="username"
                    />
                    <Field
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="password"
                        component={RenderField}
                    />
                    <button className="button is-link" type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ signInAction : signInAction}, dispatch);
} 

const reduxFormSignIn = reduxForm({
    form: 'signin'
})(Companies);

export default withRouter(connect(null, mapDispatchToProps)(reduxFormSignIn));