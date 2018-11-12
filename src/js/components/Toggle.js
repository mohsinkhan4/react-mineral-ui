import React, { Component } from "react"
import Button from "mineral-ui/Button";
import Box from 'mineral-ui/Box';

class Toggle extends Component {

    constructor() {
        super();
        this.state = { enabled : true };
    }

    render() {
        const { enabled } = this.state;
        return (
            <Box className="form-submit-buttons">
                <Button primary={ !enabled } onClick={ this.onClick.bind(this) }>Disabled</Button>
                <Button primary={ enabled } onClick={ this.onClick.bind(this) }>Enabled</Button>
            </Box>
        );
    }

    onClick(e) {
        const enabled = !this.state.enabled;
        this.setState({ enabled });
    }
}

export default Toggle;
