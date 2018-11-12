import React, { Component } from "react"
import { connect } from "react-redux"

class TableOperations extends Component {

    constructor() {
        super();
        this.state = { currentData : '' };
    }

    render() {
        const { isData, currentSearch, onSearch, removeRow } = this.props;
        const { currentData } = this.state;

        return (
            <div style={{ 'display': isData ? 'block' : 'none', 'margin': isData ? '20px 0' : '0' }}>
                <input class="form-control" style={{ margin: 5, display: 'none' }} value={ currentData } onChange={ this.onCurrentDataChange.bind(this) }/>
                <button class="btn btn-success" style={{ margin: 5 }} onClick={ this.addRow.bind(this) }>Add</button>
                <button class="btn btn-danger" style={{ margin: 5 }} onClick={ removeRow }>Remove</button>
                <input class="form-control pull-right" placeholder={ 'Search' } style={{ margin: 5 }} 
                    value={ currentSearch } onChange={ onSearch }/>
            </div>
        );
    }

    onCurrentDataChange(e) {
        this.setCurrentData(e.target.value);
    }

    setCurrentData(currentData) {
        this.setState({ currentData });
    }

    addRow() {
        const { addRow } = this.props;
        const { currentData } = this.state;

        this.setCurrentData('');
        addRow({
            text: currentData
    	});
    }

    removeRow() {
        const { removeRow } = this.props;
        removeRow();
    }
}

export default TableOperations;
