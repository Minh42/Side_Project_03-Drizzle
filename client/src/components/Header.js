import React, { Component } from 'react';
import Signup from './Signup';

class Header extends Component {
	constructor(props) {
        super(props);
		this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

	showModal() {
		document.getElementById('modal').classList.add("is-active");
    }
  
	closeModal() {
        document.getElementById('modal').classList.remove("is-active");
    }

    render() {
        return (
            <div className="hero-head">
                <header className="navbar is-dark">
                    <div className="container">
                        <div id="navbarMenuHeroC" className="navbar-menu">
                            <div className="navbar-end">
                                <a className="navbar-item">
                                    <button type="button" className="button is-link" onClick={this.showModal}>
                                        Signup
                                    </button>
                                </a>
                                <div className="modal" id='modal'>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                            <p className="modal-card-title">Signup</p>
                                            <button className="delete" aria-label="close" onClick={this.closeModal}></button>
                                        </header>
                                        <section className="modal-card-body">
                                            <Signup />
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;