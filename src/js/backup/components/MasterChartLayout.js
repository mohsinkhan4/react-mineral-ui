import React, { Component } from "react"

import Chart from './Chart/Chart'

class MasterChartLayout extends Component {

    constructor() {
        super();
    }

    render() {
        const { type, rowData, columnData, selectedColumns } = this.props;
        const isData = !!rowData.length;

        return (
            <div className="container well">
                <div className=" row"></div>
                <div className=" row">
                    <div className="col-lg-3">
                        <ul className="configSvg">
                            <li> { selectedColumns.nameColumn } </li>
                            <li> { selectedColumns.quantityColumn } </li>
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        <Chart
                            type={ type }
                            rowData={ rowData }
                            columnData={ columnData }
                            selectedColumns={ selectedColumns }
                        />
                    </div>
                </div>
            </div>
        );
    }

}

export default MasterChartLayout;
