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
    return (
        <form>
            <select id='algo' onChange={props.modeChange}>
                {props.children}
            </select>
        </form>
    );
}

function DropDownNavItem(props) {
    return <option value={props.text}>{props.text}</option>;
}
