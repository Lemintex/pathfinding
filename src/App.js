import PathfindingVisualiser from "./Pathfinding Visualiser/PathfindingVisualiser";
import Nav from "./Navbar/Navbar";
import "./App.css";

var mode = 0;
function App() {
    return (
        <>
            <div className='nav'>
                <Nav modeChange={updateMode()}></Nav>
            </div>
            <div className='Main'>
                <PathfindingVisualiser mode={mode}></PathfindingVisualiser>
            </div>
        </>
    );
}

function updateMode() {
    var m = document.querySelector("#algo");
    console.log(m);
    mode = m;
}

export default App;
