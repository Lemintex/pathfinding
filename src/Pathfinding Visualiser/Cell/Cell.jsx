import React, { Component } from "react";

import "./Cell.css";
export default class Cell extends Component {
    render() {
        let {
            row,
            col,
            isStart,
            isFinish,
            isWall,
            weight,
            previousNode,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;
        let classInfo = "";
        console.log(weight);
        if (isStart) classInfo = "cell-start";
        else if (isFinish) classInfo = "cell-finish";
        else if (isWall) classInfo = "cell-wall";
        else classInfo = `cell-weight-${Math.floor(weight / 2)}`;

        return (
            <div
                id={`cell-${row}-${col}`}
                className={`cell ${classInfo}`}
                onMouseDown={() => onMouseDown()}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}
            ></div>
        );
    }
}
