var nodesToBeVisited = [];
export function beginDepthFirstSearch(grid, startNode) {
    let nodesInVisitedOrder = [];
    nodesToBeVisited.push(startNode);
    while (nodesToBeVisited.length > 0) {
        let currentNode = nodesToBeVisited.pop();
        nodesInVisitedOrder.push(currentNode);
        currentNode.hasBeenVisited = true;
        if (currentNode.isFinish) return nodesInVisitedOrder;
        let { row, col } = currentNode;
        if (col > 0) {
            let node = grid[row][col - 1];
            visitNode(currentNode, node);
        }
        if (row < grid.length - 1) {
            let node = grid[row + 1][col];
            visitNode(currentNode, node);
        }
        if (col < grid[0].length - 1) {
            let node = grid[row][col + 1];
            visitNode(currentNode, node);
        }
        if (row > 0) {
            let node = grid[row - 1][col];
            visitNode(currentNode, node);
        }
    }
}

function visitNode(previousNode, node) {
    if (node.hasBeenVisited || node.isWall) return;
    node.previousNode = previousNode;
    nodesToBeVisited.push(node);
}
