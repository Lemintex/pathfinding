let nodesToBeVisited = [];
let grid;

export function unweightedAStar(g, startNode, finishNode) {
    grid = g;
    let visitedNodesInOrder = [];
    startNode.distance = 0;
    nodesToBeVisited.push(startNode);
    while (nodesToBeVisited.length > 0) {
        updateHeap();
        let nextNode = nodesToBeVisited.shift();
        if (nextNode.isWall) continue;
        visitedNodesInOrder.push(nextNode);
        if (nextNode.isFinish) return visitedNodesInOrder;
        updateNeighboursOfNode(nextNode, finishNode);
    }
    // if every node is visited and the finish node isn't found, give up
    return visitedNodesInOrder;
}

function updateHeap() {
    nodesToBeVisited.sort((a, b) => a.distance - b.distance);
}

function updateNeighboursOfNode(node, finishNode) {
    let neighbours = getNeighboursOfNode(node);
    for (let n of neighbours) {
        if (n.distance !== Infinity || n.isWall) continue;
        nodesToBeVisited.push(n);
        let heuristic =
            Math.abs(n.row - finishNode.row) + Math.abs(n.col - finishNode.col);
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
