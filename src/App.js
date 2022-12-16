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
    const onResetGrid = () => {
        setReset(true);
    };

    const gridReset = () => {
        setReset(false);
    };

    return (
        <>
            <div className='nav'>
                <Nav algorithmStart={onStart} gridReset={onResetGrid}></Nav>
            </div>
            <div className='main'>
                <PathfindingVisualiser
                    mode={algorithm}
                    resetGrid={reset}
                    resetGridState={gridReset}
                ></PathfindingVisualiser>
            </div>
        </>
    );
}

export default App;
