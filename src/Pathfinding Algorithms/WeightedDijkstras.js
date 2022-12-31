let grid;
let nodesToBeVisited = [];

export function weightedDijkstras(g, startNode) {
    grid = g;
    let visitedNodesInOrder = [];
    nodesToBeVisited.push(startNode); // = getAllNodesFromGrid();
    startNode.distance = 0;
    while (nodesToBeVisited.length > 0) {
        updateHeap();
        let nextNode = nodesToBeVisited.shift();
        if (nextNode.isWall) continue;
        visitedNodesInOrder.push(nextNode);
        if (nextNode.isFinish) return visitedNodesInOrder;
        updateNeighboursOfNode(nextNode);
    }
    // if every visittable node is visited and the finish node isn't found, give up
    return visitedNodesInOrder;
}

function updateHeap() {
    nodesToBeVisited.sort((a, b) => a.distance - b.distance);
}

function updateNeighboursOfNode(node) {
    let neighbours = getNeighboursOfNode(node);
    for (let n of neighbours) {
        if (n.distance !== Infinity) continue;
        nodesToBeVisited.push(n);
        n.distance = node.distance + n.weight;
        n.previousNode = node;
    }
}

// returns nodes adjacent to the argument ode
function getNeighboursOfNode(node) {
    let neighbours = [];
    let { row, col } = node;
    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours;
}
