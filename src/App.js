import { useState } from "react";
import "./App.css";
import PathfindingVisualiser from "./Pathfinding Visualiser/PathfindingVisualiser";
import Nav from "./Navbar/Navbar";

function App() {
    const [state, setState] = useState();
    const onStart = (algorithm) => {
        setState(algorithm);
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

export default App;
