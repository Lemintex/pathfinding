import React from "react";
import { useState } from "react";

import "./Navbar.css";
export default function Nav(props) {
    return (
        <Navbar>
            <NavItem image='HELLO'>
                <NavItem image='WORLD'></NavItem>
            </NavItem>
            <NavItem image='WORLD'></NavItem>
        </Navbar>
    );
}

function Navbar(props) {
    return (
        <nav className='navbar'>
            <ul className='navbar-nav'> {props.children} </ul>
        </nav>
    );
}

function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <li className='nav-item'>
            <a href='#' className='image-button' onClick={() => setOpen(!open)}>
                {props.image}
            </a>

            {open && props.children}
        </li>
    );
}

function DropDownNavMenu(props) {
    const [open, setOpen] = useState(false);

    return <label className='nav-item-drop-down-default'>Algorithm</label>;
}

function DropDownNavItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <select className='nav-item-drop-down'>
            <a href='#' className='image-button' onClick={() => setOpen(!open)}>
                {props.image}
            </a>

            {open && props.children}
        </select>
    );
}
