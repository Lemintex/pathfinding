let nodesToBeVisited = [];
let grid;

export function weightedAStar(g, startNode, finishNode) {
    grid = g;
    let visitedNodesInOrder = [];
    let averageWeight = getAverageWeightFromGrid();
    nodesToBeVisited.push(startNode); // = getAllNodesFromGrid();
    startNode.distance = 0;
    while (nodesToBeVisited.length > 0) {
        updateHeap();
        let nextNode = nodesToBeVisited.shift();
        // if (nextNode.distance === Infinity) return [];
        if (nextNode.isWall) continue;
        visitedNodesInOrder.push(nextNode);
        if (nextNode.isFinish) return visitedNodesInOrder;
        updateNeighboursOfNode(nextNode, finishNode, averageWeight);
    }
    // if every node is visited and the finish node isn't found, give up
    return visitedNodesInOrder;
}

function updateHeap() {
    nodesToBeVisited.sort((a, b) => a.distance - b.distance);
}

function updateNeighboursOfNode(node, finishNode, averageWeight) {
    let neighbours = getNeighboursOfNode(node);
    for (let n of neighbours) {
        if (n.distance !== Infinity) continue;
        nodesToBeVisited.push(n);
        let heuristic =
            Math.abs(n.row - finishNode.row) + Math.abs(n.col - finishNode.col);
        heuristic *= averageWeight;
        n.distance = node.distance + heuristic;
        n.previousNode = node;
    }
}

// returns nodes adjacent to the argument node
function getNeighboursOfNode(node) {
    let neighbours = [];
    let { row, col } = node;
    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours;
}

// gets the average weight of every node in the grid
function getAverageWeightFromGrid() {
    let averageWeight = 0;
    for (let row of grid) {
        for (let node of row) {
            averageWeight += node.weight;
        }
    }
    averageWeight /= grid.length * grid[0].length;
    averageWeight = Math.round(averageWeight);
    averageWeight = Math.max(averageWeight, 1);
    return averageWeight;
}
