import React from "react";
import { useState } from "react";

import "./Navbar.css";
export default function Nav(props) {
    const [state, setState] = useState("DepthFirstSearch");

    const updateDropdownState = (stateArg) => {
        setState(stateArg);
    };

    const beginAnimation = () => {
        props.algorithmStart(state);
    };

    return (
        <Navbar>
            <ClickableButton
                className='clear-grid'
                onclick={props.gridReset}
                text='Clear'
            ></ClickableButton>
            <DropDownNavMenu modeChange={updateDropdownState}></DropDownNavMenu>
            <ClickableButton
                className='begin-animation'
                onclick={beginAnimation}
                text='Animate'
            ></ClickableButton>
        </Navbar>
    );
}

function Navbar(props) {
    return (
        <nav className='navbar'>
            <ul className='navbar-nav'>{props.children}</ul>
        </nav>
    );
}

function DropDownNavMenu(props) {
    const options = [
        {
            value: "DepthFirstSearch",
            text: "Depth First Search",
        },
        {
            value: "BreadthFirstSearch",
            text: "Breadth First Search",
        },
        {
            value: "WeightedDijkstras",
            text: "Weighted Dijkstras",
        },
        {
            value: "UnweightedAStar",
            text: "Unweighted A-Star",
        },
        {
            value: "WeightedAStar",
            text: "Weighted A-Star",
        },
        {
            value: "RecursiveMaze",
            text: "Generate Recursive Maze",
        },
        {
            value: "GenerateWeights",
            text: "Generate Node Weights",
        },
    ];

    const updateSelected = (e) => {
        props.modeChange(e.target.value);
    };

    return (
        <form className='algorithm-select'>
            <select className='algorithm-select' onChange={updateSelected}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </form>
    );
}

function ClickableButton(props) {
    return (
        <button className={props.className} onClick={props.onclick}>
            {props.text}
        </button>
    );
}
