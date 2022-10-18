import React from "react";
import { useState } from "react";

import "./Navbar.css";
export default function Nav(props) {
    return (
        <Navbar>
            <DropDownNavMenu>
                <DropDownNavItem text='Hello'></DropDownNavItem>
                <DropDownNavItem text='World'></DropDownNavItem>
            </DropDownNavMenu>
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
    return (
        <form>
            <select>{props.children}</select>
        </form>
    );
}

// function DropDownNavItem(props) {
//     const [open, setOpen] = useState(false);

//     return (
//         <select className='nav-item-drop-down'>
//             <a href='#' className='image-button' onClick={() => setOpen(!open)}>
//                 {props.image}
//             </a>

//             {open && props.children}
//         </select>
//     );
// }

function DropDownNavItem(props) {
    return <option value={props.text}>{props.text}</option>;
}
