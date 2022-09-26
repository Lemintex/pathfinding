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
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;
        let classInfo = "";
        if (isStart) classInfo = "cell-start";
        else if (isFinish) classInfo = "cell-finish";
        else if (isWall) {
            classInfo = "cell-wall";
            console.log("WALL");
        } else classInfo = "";

        return (
            <div
                className={`cell ${classInfo}`}
                onMouseDown={() => onMouseDown()}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}
            ></div>
        );
    }
}
