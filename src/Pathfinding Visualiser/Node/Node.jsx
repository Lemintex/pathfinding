import React, { Component } from "react";

import "./Node.css";
export default class Node extends Component {
    render() {
        let {
            row,
            col,
            isStart,
            isFinish,
            isWall,
            isPath,
            weight,
            previousNode,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;
        let classInfo = "";
        console.log(weight);
        if (isStart) classInfo = "node-start";
        else if (isFinish) classInfo = "node-finish";
        else if (isWall) classInfo = "node-wall";
        else if (isPath) classInfo = "node-path";
        else classInfo = `node-weight-${Math.floor(weight / 2)}`;

        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${classInfo}`}
                onMouseDown={() => onMouseDown()}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}
            ></div>
        );
    }
}
