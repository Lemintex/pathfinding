import PathfindingVisualiser from "./Pathfinding Visualiser/PathfindingVisualiser";
import Nav from "./Navbar/Navbar";
import "./App.css";
import { useState } from "react";

var mode = 0;
function App() {
    const options = [
        { value: "UnweightedDijkstras", text: "Unweighted Dijkstras" },
        {
            value: "UnweightedDepthFirst",
            text: "Unweighted Depth First Search",
        },
        {
            value: "UnweightedBreadthFirst",
            text: "Unweighted Breadth First Search",
        },
    ];

    const [selected, setSelected] = useState(options[0].value);

    const onChange = (e) => {
        setSelected(e.target.value);
        console.log(e.target.value);
    };
    return (
        <>
            <div className='nav'>
                <Nav
                    options={options}
                    selected={selected}
                    algorithmSelectChange={onChange}
                ></Nav>
            </div>
            <div className='Main'>
                <PathfindingVisualiser
                    algorithm={selected}
                ></PathfindingVisualiser>
            </div>
        </>
    );
}

// function updateMode() {
//     var m = document.querySelector("#algo").value;
//     mode = m;
// }

export default App;
