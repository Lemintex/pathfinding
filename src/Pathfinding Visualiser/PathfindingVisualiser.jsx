import React, { Component } from "react";
import Cell from "./Cell/Cell";

import { beginDepthFirstSearch } from "../Pathfinding Algorithms/DepthFirstSearch";
import { beginBreadthFirstSearch } from "../Pathfinding Algorithms/BreadthFirstSearch";
import { generateRecursionMaze } from "../Maze Generating Algorithm/RecursiveGeneration";
import { unweightedDijkstras } from "../Pathfinding Algorithms/UnweightedDijkstras";

import "./PathfindingVisualiser.css";

const GRID_LENGTH = 39;
const GRID_HEIGHT = 25;
const START_CELL_ROW = 5;
const START_CELL_COL = 5;
const FINISH_CELL_ROW = 15;
const FINISH_CELL_COL = 35;
let ANIMATION_SPEED = 20;

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
                    Visualise DFS
                </button>
                <button onClick={() => this.visualiseBreadthFirst()}>
                    Visualise BFS
                </button>
                <button onClick={() => this.visualiseUnweightedDijkstras()}>
                    Visualise Unweighted Dijkstras
                </button>
                <button onClick={() => this.generateRecursiveMaze()}>
                    Generate Recursive Maze
                </button>
                <div>
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
        for (let i = 0; i < GRID_HEIGHT; i++) {
            var currentRow = [];
            for (let j = 0; j < GRID_LENGTH; j++) {
                let cellInfo = {
                    row: i,
                    col: j,
                    isStart: i === START_CELL_ROW && j === START_CELL_COL,
                    isFinish: i === FINISH_CELL_ROW && j === FINISH_CELL_COL,
                    isWall: false,
                    isVisited: false,
                    distance: Infinity,
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
            if (node.isStart || node.isFinish) continue;
            setTimeout(() => {
                document.getElementById(
                    `cell-${node.row}-${node.col}`
                ).className = "cell cell-visited";
                this.setState({ grid });
            }, ANIMATION_SPEED * i);
        }
    }

    visualiseBreadthFirst() {
        let { grid } = this.state;
        let start = grid[START_CELL_ROW][START_CELL_COL];
        let visitedNodesInOrder = beginBreadthFirstSearch(grid, start);
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            let node = visitedNodesInOrder[i];
            if (node.isStart || node.isFinish) continue;
            setTimeout(() => {
                document.getElementById(
                    `cell-${node.row}-${node.col}`
                ).className = "cell cell-visited";
                this.setState({ grid });
            }, ANIMATION_SPEED * i);
        }
    }

    generateRecursiveMaze() {
        let { grid } = this.state;
        let listOfGeneratedWallsInOrder = generateRecursionMaze(grid);
        for (let i = 0; i < listOfGeneratedWallsInOrder.length; i++) {
            let wallSegment = listOfGeneratedWallsInOrder[i];
            setTimeout(() => {
                for (let j = 0; j < wallSegment.length; j++) {
                    let node = wallSegment[j];
                    if (node.isStart || node.isFinish) continue;
                    node.isWall = true;

                    document.getElementById(
                        `cell-${node.row}-${node.col}`
                    ).className = "cell cell-wall";
                }
                this.setState({ grid });
            }, ANIMATION_SPEED * i);
        }
    }

    visualiseUnweightedDijkstras() {
        let { grid } = this.state;
        let start = grid[START_CELL_ROW][START_CELL_COL];
        let visitedNodesInOrder = unweightedDijkstras(grid, start);
        console.log(visitedNodesInOrder);
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            let node = visitedNodesInOrder[i];
            setTimeout(() => {
                document.getElementById(
                    `cell-${node.row}-${node.col}`
                ).className = "cell cell-visited";
                this.setState({ grid });
            }, ANIMATION_SPEED * i);
        }
    }
}
