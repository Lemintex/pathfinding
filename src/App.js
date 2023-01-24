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

    const [checkpoint, setCheckpoint] = useState(false);

    const checkpointPlace = () => {
        setCheckpoint(true);
    };

    const checkpointPlaceReset = () => {
        setCheckpoint(false);
    };

    return (
        <>
            <div className='nav'>
                <Nav
                    algorithmStart={onStart}
                    gridReset={onResetGrid}
                    checkpointPlace={checkpointPlace}
                ></Nav>
            </div>
            <div className='main'>
                <PathfindingVisualiser
                    algorithm={algorithm}
                    algorithmStart={modeActivate}
                    algorithmStartState={modeActivateReset}
                    resetGrid={reset}
                    resetGridState={gridReset}
                    checkpointPlace={checkpoint}
                    checkpointPlaceState={checkpointPlaceReset}
                ></PathfindingVisualiser>
            </div>
        </>
    );
}

export default App;
