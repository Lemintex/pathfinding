import React, { Component } from "react";
import Cell from "./Cell/Cell";

import "./PathfindingVisualiser.css";

export default class PathfindingVisualiser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };
    }

    componentDidMount() {
        let rows = 20;
        let cols = 40;
        let grid = [];
        for (let i = 1; i <= rows; i++) {
            var currentRow = [];
            for (let j = 1; j <= cols; j++) {
                let cellInfo = {
                    row: i,
                    col: j,
                    isStart: j === 1,
                    isFinish: j === cols,
                };
                currentRow.push(cellInfo);
            }
            grid.push(currentRow);
        }
        this.setState({ grid });
    }

    render() {
        let { grid } = this.state;
        console.log(grid);
        return (
            <div className='grid'>
                {grid.map((rows, rowID) => {
                    return (
                        <div>
                            {rows.map((cell, cellID) => (
                                <Cell key={cellID}></Cell>
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    }
}
