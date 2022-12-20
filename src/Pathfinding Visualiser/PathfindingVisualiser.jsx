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

const GRID_LENGTH = 39;
const GRID_HEIGHT = 25;
const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 35;
let ANIMATION_SPEED = 20;

export default class PathfindingVisualiser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mousePressed: false,
            selectedNodeIndex: [],
        };
    }

    componentDidMount() {
        this.generateEmptyGrid();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mode !== this.props.mode) {
            this.activateSelectedAlgorithm();
        } else if (prevProps.resetGrid !== this.props.resetGrid) {
            this.generateEmptyGrid();
            this.props.resetGridState();
        }
    }

    render() {
        let grid = this.state.grid;
        return (
            <>
                <div>
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    let {
                                        row,
                                        col,
                                        isStart,
                                        isFinish,
                                        isVisited,
                                        isWall,
                                        isPath,
                                        weight,
                                    } = node;
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
                                            weight={weight}
                                            onMouseDown={() =>
                                                this.handleMouseDown()
                                            }
                                            onMouseEnter={() =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() =>
                                                this.handleMouseUp()
                                            }
                                        ></Node>
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
        let index = this.state.selectedNodeIndex;
        let newGrid = this.state.grid;
        newGrid[index[0]][index[1]].isWall = true;
        this.setState({ grid: newGrid });
    }

    handleMouseEnter(row, col) {
        this.setState({ selectedNodeIndex: [row, col] });
        if (!this.state.mousePressed) return;
        let newGrid = this.state.grid;
        newGrid[row][col].isWall = true;
        this.setState({ grid: newGrid });
    }

    handleMouseUp() {
        this.setState({ mousePressed: false });
    }

    generateEmptyGrid() {
        let grid = [];
        for (let i = 0; i < GRID_HEIGHT; i++) {
            var currentRow = [];
            for (let j = 0; j < GRID_LENGTH; j++) {
                let nodeInfo = {
                    row: i,
                    col: j,
                    isStart: i === START_NODE_ROW && j === START_NODE_COL,
                    isFinish: i === FINISH_NODE_ROW && j === FINISH_NODE_COL,
                    isWall: false,
                    isVisited: false,
                    isPath: false,
                    previousNode: null,
                    distance: Infinity,
                    weight: 0,
                };
                currentRow.push(nodeInfo);
            }
            grid.push(currentRow);
        }
        this.setState({ grid });
    }

    activateSelectedAlgorithm() {
        switch (this.props.mode) {
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
                this.generateRecursiveMaze();
                break;

            case "GenerateWeights":
                this.generateNodeWeights();
                break;

            default:
                break;
        }
    }

    getPathFound() {
        let path = [];
        let { grid } = this.state;
        let node = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        if (node.previousNode === null) return null;
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
                // document.getElementById(`node-${row}-${col}`).className =
                //     "node node-path";
                this.setState({ grid: newGrid });
            }, ANIMATION_SPEED * animOrder);
        }
    }

    animateAlgorithm(visitedNodesInOrder) {
        let { grid } = this.state;
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animatePathFound();
                }, ANIMATION_SPEED * i);
            } else {
                let node = visitedNodesInOrder[i];
                if (node.isStart || node.isFinish) continue;
                setTimeout(() => {
                    document.getElementById(
                        `node-${node.row}-${node.col}`
                    ).className = "node node-visited";
                    this.setState({ grid });
                }, ANIMATION_SPEED * i);
            }
        }
    }

    visualiseDepthFirst() {
        let { grid } = this.state;
        let start = grid[START_NODE_ROW][START_NODE_COL];
        let visitedNodesInOrder = beginDepthFirstSearch(grid, start);
        this.animateAlgorithm(visitedNodesInOrder);
    }

    visualiseBreadthFirst() {
        let { grid } = this.state;
        let start = grid[START_NODE_ROW][START_NODE_COL];
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

                    document.getElementById(
                        `node-${node.row}-${node.col}`
                    ).className = "node node-wall";
                }
                this.setState({ grid });
            }, ANIMATION_SPEED * i);
        }
    }

    generateNodeWeights() {
        let { grid } = this.state;
        let start = grid[START_NODE_ROW][START_NODE_COL];
        grid = generateNodeWeights(grid, start);
        this.setState({ grid });
    }

    visualiseWeightedDijkstras() {
        let { grid } = this.state;
        let start = grid[START_NODE_ROW][START_NODE_COL];
        let visitedNodesInOrder = weightedDijkstras(grid, start);
        this.animateAlgorithm(visitedNodesInOrder);
    }

    visualiseUnweightedAStar() {
        let { grid } = this.state;
        let start = grid[START_NODE_ROW][START_NODE_COL];
        let finish = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        let visitedNodesInOrder = unweightedAStar(grid, start, finish);
        this.animateAlgorithm(visitedNodesInOrder);
    }

    visualiseWeightedAStar() {
        let { grid } = this.state;
        let start = grid[START_NODE_ROW][START_NODE_COL];
        let finish = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        let visitedNodesInOrder = weightedAStar(grid, start, finish);
        this.animateAlgorithm(visitedNodesInOrder);
    }
}
