import React from "react";
import { useState } from "react";

import "./Navbar.css";
export default function Nav(props) {
    return (
        <Navbar>
            <DropDownNavMenu modeChange={props.modeChange}>
                <DropDownNavItem text='Hello'></DropDownNavItem>
                <DropDownNavItem text='World'></DropDownNavItem>
            </DropDownNavMenu>
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
    // let e = document.getElementById("algorithmSelect");
    // let text = e.options[e.selectedIndex].text;
    return (
        <form>
            <select
                id='algorithmSelect'
                // onChange={props.modeChange.bind(this, text)}
            >
                {props.children}
            </select>
        </form>
    );
}

function DropDownNavItem(props) {
    return <option value={props.text}>{props.text}</option>;
}
