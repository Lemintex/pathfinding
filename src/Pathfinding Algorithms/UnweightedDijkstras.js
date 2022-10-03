let nodesToBeVisited = [];
let visitedNodesInOrder = [];

export function dijkstras(grid, startNode, finishNode) {
    nodesToBeVisited = getAllNodesFromGrid(grid);
    startNode.distance = 0;
    while (nodesToBeVisited.length > 0) {
        updateHeap();
        let nextNode = nodesToBeVisited.shift();
        if (nextNode.isWall) continue;
        updateNeighboursOfNode(node);
    }
}

function updateHeap() {
    nodesToBeVisited.sort((a, b) => a.distance - b.distance);
}

function updateNeighboursOfNode(node) {
    let neighbours = getNeighboursOfNode(node);
    for (let n of neighbours) {
        n.distance = node.distance + 1;
    }
}

function getNeighboursOfNode(node) {
    let neighbours = [];
    let { row, col } = node;
    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours;
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
