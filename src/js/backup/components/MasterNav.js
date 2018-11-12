import React, { Component } from "react"
import { Link } from "react-router"
import { connect } from "react-redux"

import * as actions from '../actions'

class MasterNav extends Component {

    constructor() {
        super();
    }

    render() {
        const { pathname } = this.props

        return (
            <ul class="nav nav-pills" style={{ display: 'block' }}>
                <li class={ pathname === "/" ? 'active' : '' }>
                    <Link to="/">Home</Link>
                </li>
                <li class={ pathname.match(/^\/table/) ? 'active' : '' }>
                    <Link to="table">Table</Link>
                </li>
                <li class={ pathname.match(/^\/items/) ? 'active' : '' }>
                    <Link to="items">Details</Link>
                </li>
                <li class={ pathname.match(/^\/settings/) ? 'active' : '' }>
                    <Link to="settings">Settings</Link>
                </li>
                <li className="nav-item">
                    {/* {this.getAuthButton()} */}
                </li>
            </ul>
        );
    }

    getAuthButton() {
        const { authenticated, authenticate } = this.props;

        if(authenticated) {
            return (
                <button onClick={ () => authenticate(false) }>Log Out</button>
            )
        }
        return (
            <button onClick={ () => authenticate(true) }>Log In</button>
        );
    }

}

const mapStateToProps = ((state) => {
    return {
        authenticated: state.authReducer
    };
});

export default connect(mapStateToProps, actions)(MasterNav);
