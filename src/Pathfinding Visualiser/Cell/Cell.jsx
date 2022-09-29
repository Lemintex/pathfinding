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
            isVisited,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;
        let classInfo = "";
        if (isStart) classInfo = "cell-start";
        else if (isFinish) classInfo = "cell-finish";
        // else if (isWall) classInfo = "cell-wall";
        // else if (isVisited) {
        //     console.log("VISITED");
        //     classInfo = "cell-visited";
        // } else classInfo = "";

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
