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
        this.initialiseGrid();
    }

    render() {
        let { grid } = this.state;

        return (
            <>
                <div className='grid'>
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    let { row, col, isFinish, isStart } = node;
                                    return (
                                        <Cell
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                        ></Cell>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }

    initialiseGrid() {
        let grid = [];
        let rows = 20;
        let cols = 40;
        for (let i = 0; i < rows; i++) {
            var currentRow = [];
            for (let j = 0; j < cols; j++) {
                let cellInfo = {
                    row: i,
                    col: j,
                    isStart: j === 3,
                    isFinish: j === cols - 4,
                };
                currentRow.push(cellInfo);
            }
            grid.push(currentRow);
        }
        this.setState({ grid });
    }
}
