let grid;
let nodesToBeVisited = [];

// begins BFS
export function beginBreadthFirstSearch(g, startNode) {
    grid = g;
    let nodesInVisitedOrder = [];
    startNode.hasBeenVisited = true;
    nodesToBeVisited.push(startNode);
    while (nodesToBeVisited.length > 0) {
        let currentNode = nodesToBeVisited.shift();
        nodesInVisitedOrder.push(currentNode);

        if (currentNode.isFinish) return nodesInVisitedOrder;

        let neighbours = getNeighboursOfNode(currentNode);
        for (let n of neighbours) {
            visitNode(currentNode, n);
        }
    }
    return nodesInVisitedOrder;
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

// visit the node
function visitNode(previousNode, node) {
    if (node.hasBeenVisited || node.isWall) return;
    node.previousNode = previousNode;
    node.hasBeenVisited = true;
    nodesToBeVisited.push(node);
}
