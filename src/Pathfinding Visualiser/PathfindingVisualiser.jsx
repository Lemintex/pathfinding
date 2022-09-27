import React, { Component } from "react";
import Cell from "./Cell/Cell";

import { beginDepthFirstSearch } from "../Pathfinding Algorithms/DepthFirstSearch";

import "./PathfindingVisualiser.css";

const START_CELL_ROW = 5;
const START_CELL_COL = 5;
const FINISH_CELL_ROW = 15;
const FINISH_CELL_COL = 35;

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
                <button onClick={() => this.visualiseDepthFirst()}>
                    Visualise
                </button>
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
                    isStart: i === START_CELL_ROW && j === START_CELL_COL,
                    isFinish: i === FINISH_CELL_ROW && j === FINISH_CELL_COL,
                    isWall: false,
                    isVisited: false,
                };
                currentRow.push(cellInfo);
            }
            grid.push(currentRow);
        }
        this.setState({ grid });
    }

    visualiseDepthFirst() {
        let { grid } = this.state;
        let start = grid[START_CELL_ROW][START_CELL_COL];
        let visitedNodesInOrder = beginDepthFirstSearch(grid, start);
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            let node = visitedNodesInOrder[i];
            setTimeout(() => {
                document.getElementById(
                    `cell-${node.row}-${node.col}`
                ).className = "cell cell-visited";
                this.setState({ grid });
            }, 100 * i);
        }
    }
}
