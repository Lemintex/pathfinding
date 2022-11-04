import React from "react";
import { useState } from "react";

import "./Navbar.css";
export default function Nav(props) {
    const [state, setState] = useState();

    const updateDropdownState = (stateArg) => {
        setState(stateArg);
    };

    const beginAnimation = () => {
        props.algorithmStart(state);
    };

    return (
        <Navbar>
            <DropDownNavMenu modeChange={updateDropdownState}></DropDownNavMenu>
            <StartAlgorithm beginAnimation={beginAnimation}></StartAlgorithm>
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
            value: "UnweightedDijkstras",
            text: "Unweighted Dijkstras",
        },
        {
            value: "UnweightedDepthFirst",
            text: "Unweighted Depth First Search",
        },
        {
            value: "UnweightedBreadthFirst",
            text: "Unweighted Breadth First Search",
        },
    ];

    const updateSelected = (e) => {
        props.modeChange(e.target.value);
    };

    return (
        <form>
            <select onChange={updateSelected}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </form>
    );
}

function StartAlgorithm(props) {
    return <button onClick={props.beginAnimation}>TEST</button>;
}
