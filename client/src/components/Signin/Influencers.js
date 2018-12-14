import React, { Component } from 'react';
import { InstagramLoginButton } from "react-social-login-buttons";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signInActionOauth } from '../../reducers/reducer_auth';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom'

class Influencers extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.location.search) {
            let userID = queryString.parse(this.props.location.search).userID;
            this.props.signInActionOauth(userID, this.props.history);
        }
    }

    onSubmit(OauthStrategy) {
        window.location.href = 'http://localhost:8080/api/auth/' + OauthStrategy;
    }

    render() {
        return (
            <div className="column is-half">
                <h2 className="title is-2">For influencers</h2>
                <InstagramLoginButton onClick={() => this.onSubmit('instagram')} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ signInActionOauth : signInActionOauth}, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Influencers));