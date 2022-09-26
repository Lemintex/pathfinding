import React, { Component } from "react";
import Cell from "./Cell/Cell";

import "./PathfindingVisualiser.css";

export default class PathfindingVisualiser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mousePressed: false,
            selectedCellIndex: [],
        };
    }

    componentDidMount() {
        this.initialiseGrid();
    }

    render() {
        let grid = this.state.grid;

        return (
            <>
                <div className='grid'>
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    let {
                                        row,
                                        col,
                                        isFinish,
                                        isStart,
                                        isWall,
                                    } = node;
                                    return (
                                        <Cell
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            onMouseDown={() =>
                                                this.handleMouseDown()
                                            }
                                            onMouseEnter={() =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() =>
                                                this.handleMouseUp()
                                            }
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

    handleMouseDown() {
        this.setState({ mousePressed: true });
        let index = this.state.selectedCellIndex;
        let newGrid = this.state.grid;
        newGrid[index[0]][index[1]].isWall = true;
        this.setState({ grid: newGrid });
    }

    handleMouseEnter(row, col) {
        // console.log(row);
        this.setState({ selectedCellIndex: [row, col] });
        if (!this.state.mousePressed) return;
        let newGrid = this.state.grid;
        newGrid[row][col].isWall = true;
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mousePressed: false });
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
                    isWall: false,
                };
                currentRow.push(cellInfo);
            }
            grid.push(currentRow);
        }
        this.setState({ grid });
    }
}
