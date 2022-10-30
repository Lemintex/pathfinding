import PathfindingVisualiser from "./Pathfinding Visualiser/PathfindingVisualiser";
import Nav from "./Navbar/Navbar";
import "./App.css";
import { useState } from "react";

var mode = 0;
function App() {
    const [state, setState] = useState();
    const updateState = (text) => {
        setState(text);
        console.log(text);
    };
    return (
        <>
            <div className='nav'>
                <Nav modeChange={updateState}></Nav>
            </div>
            <div className='Main'>
                <PathfindingVisualiser></PathfindingVisualiser>
            </div>
        </>
    );
}

// function updateMode() {
//     var m = document.querySelector("#algo").value;
//     mode = m;
// }

export default App;
