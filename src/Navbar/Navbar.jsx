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
    return (
        <form>
            <select value={props.selected} onChange={props.modeChange}>
                {props.options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </form>
    );
}

function DropDownNavItem(props) {
    return <option value={props.text}>{props.text}</option>;
}
