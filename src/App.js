import { useState } from "react";
import "./App.css";
import PathfindingVisualiser from "./Pathfinding Visualiser/PathfindingVisualiser";
import Nav from "./Navbar/Navbar";

function App() {
    const [modeActivate, setModeActivate] = useState(false);
    const modeActivateReset = () => {
        setModeActivate(false);
    };
    const [algorithm, setAlgorithm] = useState("DepthFirst");
    const onStart = (algorithm) => {
        setAlgorithm(algorithm);
        setModeActivate(true);
    };

    const [reset, setReset] = useState(false);
    const onResetGrid = () => {
        setReset(true);
    };

    const gridReset = () => {
        setReset(false);
    };

    const [checkpoint, onCheckpoint] = useState(false);

    return (
        <>
            <div className='nav'>
                <Nav algorithmStart={onStart} gridReset={onResetGrid}></Nav>
            </div>
            <div className='main'>
                <PathfindingVisualiser
                    algorithm={algorithm}
                    algorithmStart={modeActivate}
                    algorithmStartState={modeActivateReset}
                    resetGrid={reset}
                    resetGridState={gridReset}
                ></PathfindingVisualiser>
            </div>
        </>
    );
}

export default App;
