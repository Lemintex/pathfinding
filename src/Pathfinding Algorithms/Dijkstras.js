let nodesToBeVisited = [];
let visitedNodesInOrder = [];

export function dijkstras(grid, startNode, finishNode) {
    nodesToBeVisited = getAllNodesFromGrid(grid);
    startNode.distance = 0;
    while (nodesToBeVisited.length > 0) {}
}

function getAllNodesFromGrid(grid) {
    let nodes = [];
    for (let row of grid) {
        for (let node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}
