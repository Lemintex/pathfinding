import React, { Component } from "react";

import "./Cell.css";
//FORGOT TO COMMIT TODAY
export default class Cell extends Component {
    render() {
        let {
            row,
            col,
            isStart,
            isFinish,
            isWall,
            weight,
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
        // else if (weight === 0) classInfo = "cell-weight-0";
        // else if (weight <= 1) classInfo = "cell-weight-1";
        // else if (weight <= 3) classInfo = "cell-weight-2";
        // else if (weight > 3) classInfo = "cell-weight-3";
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
