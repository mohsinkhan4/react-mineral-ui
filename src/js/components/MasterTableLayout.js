import React, { Component } from "react"
import { connect } from "react-redux"

import { fetchColumnData } from "../actions/columnDataActions"
import { fetchRowData, addRowData, removeRowData, editRowData } from "../actions/rowDataActions"

import FileUpload from "./FileUpload/FileUpload"
import Table from "./Table/Table"
import FieldSelector from "./FieldSelector/FieldSelector"
import ChartSelector from "./ChartSelector/ChartSelector"
import MasterChartLayout from "./MasterChartLayout"

const CHART_TYPE = { BAR: 'Bar', COLUMN: 'Column' };

class MasterTableLayout extends Component {

    constructor() {
        super();
        this.state = { show: false, selectedColumns: {}, chartType: 'COLUMN' };
    }

    render() {
        const { rowData, columnData } = this.props;
        const { show, selectedColumns, chartType } = this.state;
        const chartRowData = show ? rowData : [];
        const chartTypes = Object.keys(CHART_TYPE)
            .filter( type => CHART_TYPE.hasOwnProperty(type) )
            .map( type => {
                return { key: type, text: CHART_TYPE[type]};
            });
        return (
            <div>
                <FileUpload onUpload={ this.importData.bind(this) }/>
                <Table
                    columnData={ columnData }
                    rowData={ rowData }
                    addRow={ this.addRow.bind(this) }
                    removeRow={ this.removeRow.bind(this) }
                    editRow={ this.editRow.bind(this) }
                    importData={ this.importData.bind(this) }
                />
                <FieldSelector 
                    columnData={ columnData }
                    chartTypes={ chartTypes }
                    selectedChartType={ chartType }
                    onSubmit={ this.onSubmit.bind(this) }
                    onChartSelected={ this.onChartSelected.bind(this) } />
                <MasterChartLayout
                    type={ CHART_TYPE[chartType] }
                    rowData={ chartRowData }
                    columnData={ columnData }
                    selectedColumns={ selectedColumns }
                />
            </div>
        );
    }

    onSubmit(selectedColumns) {
        this.setState({ show: true, selectedColumns });
    }

    onChartSelected(chartType) {
        this.setState({ chartType });
    }

    addRow(row) {
        const { dispatch } = this.props;
        dispatch( addRowData({
            'text': row.text
        }) );
    }

    removeRow(keys) {
        const { dispatch } = this.props;
        dispatch( removeRowData(keys) );
    }

    editRow(rowKey, columnKey, text) {
        const { dispatch } = this.props;
        dispatch( editRowData(rowKey, columnKey, text) );
    }

    importData(d) {
        const { dispatch } = this.props;
        const keyList = this.getKeylist(d);
        dispatch( fetchColumnData(d, keyList) );
        dispatch( fetchRowData(d, keyList) );
    }

    componentWillMount() {
        const { dispatch } = this.props;
        let d = [{
        	"artist 0": "Pink Floyd",
        	"album": "The Division Bell",
        	"salesX": 80,
            "salesY": 80
        },{
        	"artist 1": "Poets Of The Fall",
        	"album": "Jealous Gods",
            "salesX": 30,
            "salesY": 30
        }, {
        	"artist 2": "Cranberries",
        	"album" : "Stars",
            "salesX": 40,
            "salesY": 40
        }, {
        	"artist 3": "Evanescence",
        	"album" : "Fallen",
            "salesX": 30,
            "salesY": 60
        }, {
        	"artist": "Nirvana",
        	"album" : "Nevermind",
            "salesX": 80,
            "salesY": 90
        }, {
        	"artist": "Metallica",
        	"album" : "Master Of Puppets",
            "salesX": 80,
            "salesY": 10
        }, {
        	"artist 0": "Indian Ocean",
        	"album" : "Kandisa",
            "salesX": 80,
            "salesY": 40
        }];

        // d = {
        // 	"artist": "Pink Floyd",
        // 	"album": "The Division Bell",
        // 	"sales": 80
        // };

        const keyList = this.getKeylist(d);
        dispatch( fetchColumnData(d, keyList) );
        dispatch( fetchRowData(d, keyList) );

    }

    getKeylist(d) {
        const keysObj = {}
        const keyCollater = el => {
            Object.keys(el).forEach(key => {
                keysObj[key] = true;
            });
        }
        if(Array.isArray(d)) {
            d.forEach(keyCollater);
        } else {
            keyCollater(d);
        }
        return Object.keys(keysObj);
    }
}

const mapStateToProps = ((state) => {
    return {
        columnData: state.columnData.columnData,
        rowData: state.rowData.rowData,
    };
});

export default connect(mapStateToProps)(MasterTableLayout);
