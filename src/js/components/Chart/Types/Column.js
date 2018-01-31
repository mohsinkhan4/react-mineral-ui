import React, { Component } from "react"

import * as d3 from 'd3'

class Column extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        const { type } = this.props;
        const g = d3.select(this.refs[type]);
        this.update(g);
    }

    componentDidUpdate() {
        const { type } = this.props;
        const g = d3.select(this.refs[type]);
        this.update(g);
    }

    render() {
        const { type, dim } = this.props;
        const { margin } = dim;
        const transform = "translate(" + margin.x + "," + margin.y +")"
        return (
            <g transform={ transform } ref={ type } data-chart-type={ type } className="g-bar"></g>
        );
    }

    update(g) {
        this.updateBars(g);
        this.updateLabels(g);
    }

    updateBars(g) {
        const { rowData, selectedColumns, dim } = this.props;
        const { margin } = dim;
        const { height, width } = dim;
        // let width = 200;

        const net_height = height - (margin.y * 2);
        const net_width = width - (margin.x * 2);

        const qc = selectedColumns.quantityColumn;
        if(!qc) return;

        const rowDataQC = rowData.map(row => (!isNaN(row[qc]) ? row[qc] : 0));
        const max = d3.max(rowDataQC);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(rowDataQC)])
            .range([0, net_height]);
        const xScale = d3.scaleLinear()
            .domain([0, rowDataQC.length])
            .range([0, net_width]);
        const evaluateDim = (row, qc) => (!isNaN(row[qc]) ? (yScale(row[qc])) : 0);

        const rect = g
            .selectAll('rect')
            .data(rowData);

        rect.enter()
            .append('rect')
            .attr('key', (row) => (row.key) )
            .attr('x', (row, i) => xScale(i) )
            .attr('y', net_height)
            .attr('fill', "mediumaquamarine")
            .attr('width', 20)
            .attr('height', 0)
            .transition()
            .duration(2000)
            .attr('y', (row) => (net_height - evaluateDim(row, qc)) )
            .attr('height', (row) => evaluateDim(row, qc) );

        rect
            .attr('key', (row) => (row.key) )
            .transition()
            .duration(2000)
            .attr('x', (row, i) => xScale(i) )
            .attr('y', (row) => (net_height - evaluateDim(row, qc)) )
            .attr('height', (row) => evaluateDim(row, qc) );

        rect.exit()
            .remove('rect');

    }

    updateLabels(g) {
        const { rowData, selectedColumns, dim } = this.props;
        const { margin } = dim;
        let { height, width } = dim;
        // let width = 200;

        height -= (margin.y * 2);
        width -= (margin.x * 2);

        const nc = selectedColumns.nameColumn;
        if(!nc) return;
        const qc = selectedColumns.quantityColumn;
        if(!qc) return;

        const rowDataQC = rowData.map(row => (!isNaN(row[qc]) ? row[qc] : 0));

        const evaluateText = (row, nc) => (row[nc] ? row[nc] : '');
        const xScale = d3.scaleLinear()
            .domain([0, rowDataQC.length])
            .range([0, width]);

        const text = g
            .selectAll('text')
            .data(rowData);

        text.enter()
            .append('text')
            .attr('key', (row) => (row.key) )
            .text(row => evaluateText(row, nc) )
            .attr('fill', 'black')
            .attr('x', (d, i) => xScale(i))
            .attr('y', height )
            .attr('transform', (d, i) => {
                return "rotate(-65, " + xScale(i) +  ", " + height + ")";
            })
            .attr('style', 'cursor: pointer;')
            .on('mouseover', (d) => {
                console.log(d[nc]);
            });

        text
            .attr('key', row => row.key)
            .attr('x', (row, i) => xScale(i) )
            .text(row => evaluateText(row, nc) );

        text.exit()
            .remove('text');
    }
}

export default Column;
