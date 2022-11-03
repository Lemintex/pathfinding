import React from "react";
import { useState } from "react";

import "./Navbar.css";
export default function Nav(props) {
    return (
        <Navbar>
            <DropDownNavMenu
                options={props.options}
                selected={props.selected}
                modeChange={props.algorithmSelectChange}
            ></DropDownNavMenu>
            <StartAlgorithm
                activateAlgorithm={props.algorithmSelectChange}
            ></StartAlgorithm>
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
        { value: "UnweightedDijkstras", text: "Unweighted Dijkstras" },
        {
            value: "UnweightedDepthFirst",
            text: "Unweighted Depth First Search",
        },
        {
            value: "UnweightedBreadthFirst",
            text: "Unweighted Breadth First Search",
        },
    ];

    const [state, setState] = useState(options[0]);

    const updateSelected = (e) => {
        setState(e.target.value);
        console.log(state);
    };

    return (
        <form>
            <select value={state} onChange={updateSelected}>
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
    return <button onClick={props.modeChange}>TEST</button>;
}
