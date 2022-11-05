import { useState } from "react";
import "./App.css";
import PathfindingVisualiser from "./Pathfinding Visualiser/PathfindingVisualiser";
import Nav from "./Navbar/Navbar";

// import { activateSelectedAlgorithm } from "./Pathfinding Visualiser/PathfindingVisualiser";

function App() {
    const [state, setState] = useState();
    const onStart = (algorithm) => {
        setState(algorithm);
        console.log(state);
    };
    return (
        <>
            <div className='nav'>
                <Nav algorithmStart={onStart}></Nav>
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
