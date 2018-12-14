import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { signUpAction } from '../reducers/reducer_companies';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RenderField from './Form/RenderField';

class Signup extends Component {
    constructor(props) {
        super(props);
        const initData = {
            "firstname": null,
            "lastname": null,
            "email": null,
            "company": null,
            "account": null
        };
        this.props.initialize(initData);
    }

    onSubmit(values) {
        this.props.signUpAction(values, this.props.history);
    }

    render () {
        const { handleSubmit } = this.props;
        return (
            <form name="signup" className="signup" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                label="Firstname"
                name="firstname"
                type="text"
                component= {RenderField}
                placeholder=""
                />
                <Field
                label="Lastname"
                name="lastname"
                type="text"
                component= {RenderField}
                placeholder=""
                />
                <Field
                label="Email"
                name="email"
                type="email"
                component= {RenderField}
                placeholder=""
                />
                <Field
                label="Company"
                name="company"
                type="text"
                placeholder=""
                component={RenderField}
                />
                <Field
                label="Account"
                name="account"
                type="text"
                placeholder=""
                component={RenderField}
                />
                <button className="button is-link" type="submit">Create an account</button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        signUpAction: signUpAction
    }, dispatch);
}

const reduxFormSignup = reduxForm({
    form: 'signup'
})(Signup);

export default withRouter(connect(null, mapDispatchToProps)(reduxFormSignup));


          