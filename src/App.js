import PathfindingVisualiser from "./Pathfinding Visualiser/PathfindingVisualiser";
import Nav from "./Navbar/Navbar";
import "./App.css";

function App() {
    return (
        <>
            <div className='nav'>
                <Nav></Nav>
            </div>
            <div className='Main'>
                <PathfindingVisualiser></PathfindingVisualiser>
            </div>
        </>
    );
}

export default App;
