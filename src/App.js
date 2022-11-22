import { useState } from "react";
import "./App.css";
import PathfindingVisualiser from "./Pathfinding Visualiser/PathfindingVisualiser";
import Nav from "./Navbar/Navbar";

function App() {
    const [algorithm, setAlgorithm] = useState("DepthFirst");
    const onStart = (algorithm) => {
        setAlgorithm(algorithm);
    };

    const [reset, setReset] = useState(false);
    const onResetGrid = (reset) => {
        setReset(reset);
    };
    return (
        <>
            <div className='nav'>
                <Nav algorithmStart={onStart} gridReset={onResetGrid}></Nav>
            </div>
            <div className='Main'>
                <PathfindingVisualiser
                    mode={algorithm}
                    resetGrid={reset}
                ></PathfindingVisualiser>
            </div>
        </>
    );
}

export default App;
