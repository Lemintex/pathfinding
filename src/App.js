import { useState } from "react";
import "./App.css";
import PathfindingVisualiser from "./Pathfinding Visualiser/PathfindingVisualiser";
import Nav from "./Navbar/Navbar";

// import { activateSelectedAlgorithm } from "./Pathfinding Visualiser/PathfindingVisualiser";

var mode = 0;
function App() {
    const onChange = (e) => {
        console.log(e.target.value);
    };
    return (
        <>
            <div className='nav'>
                <Nav
                    algorithmSelectChange={onChange}
                    // activateAlgorithm={() =>
                    //     // activateSelectedAlgorithm(selected)
                    // }
                ></Nav>
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
