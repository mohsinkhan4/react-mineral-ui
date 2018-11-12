import React, { Component } from "react"
import { Link } from "react-router"
import { connect } from "react-redux"

export default function(ComposedComponent) {

    class Authentication extends Component {

        // exposing the router object to the Component props
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            const { authenticated } = this.props;

            if(!authenticated) {
                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            const { authenticated } = nextProps;

            if(!authenticated) {
                this.context.router.push('/');
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    const mapStateToProps = ((state) => {
        return {
            authenticated: state.authReducer
        };
    });

    return connect(mapStateToProps) (Authentication);
}
