import React, { Component } from "react";
import Node from "./Node/Node";

import { beginDepthFirstSearch } from "../Pathfinding Algorithms/DepthFirstSearch";
import { beginBreadthFirstSearch } from "../Pathfinding Algorithms/BreadthFirstSearch";
import { generateRecursionMaze } from "../Maze Generating Algorithm/RecursiveGeneration";
import { weightedDijkstras } from "../Pathfinding Algorithms/WeightedDijkstras";
import { unweightedAStar } from "../Pathfinding Algorithms/UnweightedAStar";
import { weightedAStar } from "../Pathfinding Algorithms/WeightedAStar";
import { generateNodeWeights } from "../Pathfinding Algorithms/GenerateNodeWeights";
import "./PathfindingVisualiser.css";

const MOUSE_MODE = {
    START: 0,
    FINISH: 1,
    WALL: 2,
    CHECKPOINT_ADD: 3,
};

const GRID_LENGTH = 39;
const GRID_HEIGHT = 25;
// const START_NODE_ROW = 5;
// const START_NODE_COL = 5;
// const FINISH_NODE_ROW = 15;
// const FINISH_NODE_COL = 35;

let ANIMATION_SPEED = 20;

export default class PathfindingVisualiser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mousePressed: false,
            mousePressedMode: MOUSE_MODE.WALL,
            algorithmInProgress: false,
            selectedNodeIndex: [],
            startPos: {
                row: 5,
                col: 5,
            },
            finishPos: {
                row: 15,
                col: 35,
            },
            // checkpointPosArray: [],
        };
    }

    componentDidMount() {
        this.generateEmptyGrid();
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.algorithmStart &&
            prevProps.algorithmStart !== this.props.algorithmStart
            // !this.state.algorithmInProgress
        ) {
            this.activateSelectedAlgorithm();
            this.props.algorithmStartState();
        }
        if (
            this.props.resetGrid &&
            prevProps.resetGrid !== this.props.resetGrid
        ) {
            this.generateEmptyGrid();
            this.props.resetGridState();
        }
        // if (
        //     this.props.checkpointPlace &&
        //     prevProps.checkpointPlace !== this.props.checkpointPlace
        // ) {
        //     let checkpoint = this.state.checkpointPosArray;
        //     checkpoint.push({ row: -1, col: -1 });
        //     this.setState({
        //         checkpointPosArray: checkpoint,
        //         mousePressedMode: MOUSE_MODE.CHECKPOINT_ADD,
        //         mousePressed: true,
        //     });
        //     this.props.checkpointPlaceState();
        // }
    }

    render() {
        let { grid, startPos, finishPos } = this.state;
        return (
            <div>
                <div className='grid'>
                    {grid.map((row, rowIdx) => {
                        return (
                            <div className='row' key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    let {
                                        row,
                                        col,
                                        isVisited,
                                        isWall,
                                        isPath,
                                        weight,
                                    } = node;

                                    let isStart =
                                        startPos.row === row &&
                                        startPos.col === col;

                                    let isFinish =
                                        finishPos.row === row &&
                                        finishPos.col === col;

                                    let isCheckpoint = false;
                                    // for (let c of this.state
                                    //     .checkpointPosArray) {
                                    //     if (c.row === row && c.col === col) {
                                    //         isCheckpoint = true;
                                    //         break;
                                    //     }
                                    // }

                                    return (
                                        <Node
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isVisited={isVisited}
                                            isWall={isWall}
                                            isPath={isPath}
                                            isCheckpoint={isCheckpoint}
                                            weight={weight}
                                            onMouseDown={() =>
                                                this.handleMouseDown(row, col)
                                            }
                                            onMouseEnter={() =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() =>
                                                this.handleMouseUp(row, col)
                                            }
                                        ></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    handleMouseDown(row, col) {
        console.log(this.state);
        this.setState({ mousePressed: true });
        if (this.state.algorithmInProgress) return;
        let newGrid = this.state.grid;
        let node = newGrid[row][col];
        if (node.isStart) {
            this.setState({ mousePressedMode: MOUSE_MODE.START });
            node.isStart = false;
        } else if (node.isFinish) {
            this.setState({ mousePressedMode: MOUSE_MODE.FINISH });
            node.isFinish = false;
        } else if (this.state.mousePressedMode == MOUSE_MODE.CHECKPOINT_ADD) {
            //checkpoint stuff here
        } else {
            this.setState({ mousePressedMode: MOUSE_MODE.WALL });
            node.isWall = !node.isWall;
            console.log(node);
        }
        this.setState({ grid: newGrid });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mousePressed) return;
        let newGrid = this.state.grid;
        let node = newGrid[row][col];
        switch (this.state.mousePressedMode) {
            case MOUSE_MODE.START:
                this.setState({ startPos: { row: row, col: col } });
                break;

            case MOUSE_MODE.FINISH:
                this.setState({ finishPos: { row: row, col: col } });
                break;

            case MOUSE_MODE.WALL:
                node.isWall = true;
                break;

            // case MOUSE_MODE.CHECKPOINT_ADD:
            //     this.addCheckpoint(row, col);
            default:
                break;
        }
        this.setState({ grid: newGrid });
    }

    //TODO: consider removing
    handleMouseUp(row, col) {
        if (!this.state.mousePressed) return;
        let newGrid = this.state.grid;
        let node = newGrid[row][col];

        switch (this.state.mousePressedMode) {
            case MOUSE_MODE.START:
                node.isStart = true;
                break;

            case MOUSE_MODE.FINISH:
                node.isFinish = true;
                break;

            case MOUSE_MODE.WALL:
                // WALL STUFF
                break;

            // case MOUSE_MODE.CHECKPOINT_ADD:
            //     this.removeCheckpoint(row, col);
            //     break;
            default:
                break;
        }
        this.setState({ mousePressed: false });
        this.setState({ mousePressedMode: MOUSE_MODE.WALL });
        this.setState({ grid: newGrid });
    }

    generateEmptyGrid() {
        let grid = [];
        let { startPos, finishPos } = this.state;
        for (let i = 0; i < GRID_HEIGHT; i++) {
            var currentRow = [];
            for (let j = 0; j < GRID_LENGTH; j++) {
                let nodeInfo = {
                    row: i,
                    col: j,
                    isStart: i === startPos.row && j === startPos.col,
                    isFinish: i === finishPos.row && j === finishPos.col,
                    isWall: false,
                    isVisited: false,
                    isPath: false,
                    isCheckpoint: false,
                    previousNode: null,
                    distance: Infinity,
                    weight: 0,
                };
                currentRow.push(nodeInfo);
            }
            grid.push(currentRow);
        }
        this.setState({ grid: grid });
    }

    // addCheckpoint(row, col) {
    //     let checkpoint = this.state.checkpointPosArray;
    //     checkpoint.pop();
    //     checkpoint.push({ row: row, col: col });
    //     this.setState({ checkpointPosArray: checkpoint });
    // }

    // removeCheckpoint(row, col) {
    //     let checkpoints = this.state.checkpointPosArray;
    //     for (let i = 0; i < checkpoints.length - 1; i++) {
    //         let c = checkpoints[i];
    //         if (c.row === row && c.col === col) {
    //             checkpoints.pop();
    //             checkpoints.splice(i, 1);
    //             this.setState({ checkpointPosArray: checkpoints });
    //             return;
    //         }
    //     }
    // }

    activateSelectedAlgorithm() {
        switch (this.props.algorithm) {
            case "DepthFirstSearch":
                this.visualiseDepthFirst();
                break;

            case "BreadthFirstSearch":
                this.visualiseBreadthFirst();
                break;

            case "WeightedDijkstras":
                this.visualiseWeightedDijkstras();
                break;

            case "UnweightedAStar":
                this.visualiseUnweightedAStar();
                break;

            case "WeightedAStar":
                this.visualiseWeightedAStar();
                break;

            case "RecursiveMaze":
                this.generateEmptyGrid();
                this.generateRecursiveMaze();
                break;

            case "GenerateWeights":
                this.generateNodeWeights();
                break;

            default:
                break;
        }
        this.setState({ algorithmInProgress: true });
    }

    getPathFound() {
        let path = [];
        let { grid, finishPos } = this.state;
        let node = grid[finishPos.row][finishPos.col];
        if (node.previousNode === null) return [];
        node = node.previousNode;
        while (node.previousNode !== null && !node.isStart) {
            path.push(node);
            node = node.previousNode;
        }
        return path;
    }

    animatePathFound() {
        let path = this.getPathFound();
        let newGrid = this.state.grid;
        let animOrder = 0;
        for (let i = path.length - 1; i >= 0; i--, animOrder++) {
            setTimeout(() => {
                const { row, col } = path[i];
                newGrid[row][col].isPath = true;
                this.setState({ grid: newGrid });
            }, ANIMATION_SPEED * animOrder);
        }
        this.setState({ algorithmInProgress: false });
    }

    animateAlgorithm(visitedNodesInOrder) {
        this.setState({ algorithmInProgress: true });
        let newGrid = this.state.grid;
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animatePathFound();
                }, ANIMATION_SPEED * i);
                continue;
            }
            let node = visitedNodesInOrder[i];
            if (node.isStart || node.isFinish) continue;
            setTimeout(() => {
                const { row, col } = node;
                newGrid[row][col].isVisited = true;
                this.setState({ grid: newGrid });
            }, ANIMATION_SPEED * i);
        }
    }

    visualiseDepthFirst() {
        let { grid } = this.state;
        let { row, col } = this.state.startPos;
        let start = grid[row][col];
        let visitedNodesInOrder = beginDepthFirstSearch(grid, start);
        this.animateAlgorithm(visitedNodesInOrder);
    }

    visualiseBreadthFirst() {
        let { grid } = this.state;
        let { row, col } = this.state.startPos;
        let start = grid[row][col];
        let visitedNodesInOrder = beginBreadthFirstSearch(grid, start);
        this.animateAlgorithm(visitedNodesInOrder);
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
                }
                this.setState({ grid });
            }, ANIMATION_SPEED * i);
        }
        this.setState({ algorithmInProgress: false });
    }

    generateNodeWeights() {
        let { grid } = this.state;
        let { row, col } = this.state.startPos;
        let start = grid[row][col];
        grid = generateNodeWeights(grid, start);
        this.setState({ grid });
    }

    visualiseWeightedDijkstras() {
        let { grid } = this.state;
        let { row, col } = this.state.startPos;
        let start = grid[row][col];
        let visitedNodesInOrder = weightedDijkstras(grid, start);
        this.animateAlgorithm(visitedNodesInOrder);
    }

    visualiseUnweightedAStar() {
        let { grid } = this.state;
        let { startPos } = this.state;
        let start = grid[startPos.row][startPos.col];
        let { finishPos } = this.state;
        let finish = grid[finishPos.row][finishPos.col];
        let visitedNodesInOrder = unweightedAStar(grid, start, finish);
        this.animateAlgorithm(visitedNodesInOrder);
    }

    visualiseWeightedAStar() {
        let { grid } = this.state;
        let { startPos } = this.state;
        let start = grid[startPos.row][startPos.col];
        let { finishPos } = this.state;
        let finish = grid[finishPos.row][finishPos.col];
        let visitedNodesInOrder = weightedAStar(grid, start, finish);
        this.animateAlgorithm(visitedNodesInOrder);
    }
}
