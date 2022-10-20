import PathfindingVisualiser from "./Pathfinding Visualiser/PathfindingVisualiser";
import Nav from "./Navbar/Navbar";
import "./App.css";

var mode = 0;
function App() {
    return (
        <>
            <div className='nav'>
                <Nav modeChange={Change(mode)}></Nav>
            </div>
            <div className='Main'>
                <PathfindingVisualiser mode={mode}></PathfindingVisualiser>
            </div>
        </>
    );
}

function Change(m) {
    mode = m;
}

export default App;
