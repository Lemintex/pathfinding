import React, { Component } from "react";

import "./Cell.css";
export default class Cell extends Component {
    render() {
        let { row, col, isStart, isFinish } = this.props;
        let classInfo = "";
        if (isStart) classInfo = "cell-start";
        else if (isFinish) classInfo = "cell-finish";
        else classInfo = "cell";
        return <div className={`cell ${classInfo}`}></div>;
    }
}
